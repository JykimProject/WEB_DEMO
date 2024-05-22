import Vue from "vue";
import store from "@/store";
import router from '@/router'
import ws from "@/shared/lib/ws";
import { RPC } from "@/shared/constants";
import Translation from "@/shared/lib/i18n";
import { Notice } from "iview";
import CryptoJS from "crypto-js";

import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import axios from 'axios';

// translation helper
export function t({ state }, key, params) {
	if (!key) {
		return {};
	}
	return new Translation(state.i18n.langData, key, params);
}

export function indexify(collection) {
	return collection.map((obj, index) => {
		obj.$index = index;
		return obj;
	});
}

export function findByIndex(collection, index) {
	const obj = collection.find((item) => {
		return item.$index === index;
	});

	if (typeof obj !== "undefined") {
		const o = Object.assign({}, obj);

		if (o.hasOwnProperty("$index")) {
			delete o.$index;
		}
		return o;
	}
	return obj;
}

/**
 * trackFields sets watcher on form fields and
 * commits vuex mutations in watcher handler.
 *
 * trackFields needs to be bound to VM,
 * because it has to access it as `this`.
 *
 * `formKey` param is object key name,
 * must be string. On VM, form fields
 * must be accessible by following path:
 *
 * this[formKey].fields.fieldNameHere
 *
 * trackFields also sets watcher for
 * "custom" fields. To enable custom fields,
 * field value must be set to "$custom".
 * Custom fields' values must be accessible
 * by following path:
 *
 * this[formKey].customFields.fieldNameHere
 *
 * trackFields returns function for unwatching
 * all watchers
 */
export function trackFields(formKey) {
	const watchers = [];

	// watch field changes and stage them in form store
	Object.keys(this[formKey].fields).forEach((key) => {
		const watcher = this.$watch(
			`${formKey}.fields.${key}`,
			(value) => {
				if (value === "$custom") {
					return;
				}
				store.commit("STAGE_FORM_FIELD", {
					formName: this[formKey].name,
					fieldsetName: "default",
					fieldName: key,
					data: { value },
				});
			},
			{ immediate: true }
		);
		watchers.push(watcher);
	});
	// ..also watch custom field changes
	Object.keys(this[formKey].customFields || {}).forEach((key) => {
		const watcher = this.$watch(
			`${formKey}.customFields.${key}`,
			(value) => {
				if (this[formKey].fields[key] !== "$custom") {
					return;
				}
				store.commit("STAGE_FORM_FIELD", {
					formName: this[formKey].name,
					fieldsetName: "default",
					fieldName: key,
					data: { value },
				});
			},
			{ immediate: true }
		);
		watchers.push(watcher);
	});

	return () => {
		watchers.forEach((unwatch) => unwatch());
	};
}

/**
 * Gets sub object by given depth
 *
 * Useful, when object has only one key
 * and value of that key is needed
 *
 * getSubObject({someUnknownSingleKey: 'val'})
 * -> 'val'
 */
export function getSubObject(obj, depth = 1) {
	for (let i = depth; i > 0; i--) {
		if (typeof obj !== "object") {
			obj = {};
			break;
		}
		let keys = Object.keys(obj);

		if (!keys.length) {
			obj = {};
			break;
		}
		obj = obj[keys[0]];
	}
	return obj;
}

/**
 * Fills given object (with predifined keys)
 * with source object's values by matching keys
 * from source. If source key doesn't exist,
 * it uses default target key value.
 * Also handles bool casting. ('0' == false)
 *
 * When empty object given as second param,
 * it enters into "empty" mode to reset
 * target keys to their original type.
 *
 * @param {Object} target      Target object to fill
 * @param {Object} ...sources  Source objects
 */
export function fillObject(target, ...sources) {
	const empty = sources.length === 1 && Object.keys(sources[0]).length === 0;

	sources.forEach((source) => {
		Object.keys(target).forEach((key) => {
			if (typeof target[key] === "boolean") {
				// zero-val of boolean
				// as default
				let val = false;

				// use target as default
				// if it's defined
				if (target[key] != null) {
					val = target[key];
				}

				// requested to empty
				// target object
				if (empty) {
					Vue.set(target, key, val);
				} else {
					Vue.set(
						target,
						key,
						source[key] != null
						? // cast truthy/falsy to bool
						source[key] == 1
						? true
						: false
						: // fallback to default
						val
					);
				}
			} else if (Array.isArray(target[key])) {
				if (empty) {
					Vue.set(target, key, []);
				} else if (Array.isArray(source[key])) {
					Vue.set(target, key, source[key].slice());
				}
			} else {
				let val = null;

				if (target[key] != null) {
					val = target[key];
				}

				if (empty) {
					val = typeof val === "string" ? "" : null;

					Vue.set(target, key, val);
				} else {
					if (source[key] != null && source[key] !== "") {
						val = source[key];
					}

					Vue.set(target, key, val);
				}
			}
		});
	});
}

let showNotice = true;

export function reportError(err) {
	if(err.message == 'Permission denied') {
		ws.disconnect()
		store.dispatch('clearSession')
		store.dispatch('setLastPage', '')
		router.replace({name: 'login'}).catch(() => {})
		err.message = 'Notification: Your login session has expired. For security reasons, please log in again.'
	}
	let message = t(store, "err-loading-data").str;
	let title = t(store, "error").cap;

	if (err && typeof err === "object") {
		if (err.message) {
			message = err.message;
		} else if (err.desc) {
			message = err.desc;
		}

		if (err.title) {
			title = err.title;
		}
	} else if (typeof err === "string") {
		message = t(store, err).str;
	}

	if (showNotice) {
		Notification.error({
			title: title,
			message: message
		});
	}
}

export function reportnote(err) {
	let message = t(store, "err-loading-data").str;
	let title = t(store, "success").cap;

	if (err && typeof err === "object") {
		if (err.message) {
			message = err.message;
		} else if (err.desc) {
			message = err.desc;
		}

		if (err.title) {
			title = err.title;
		}
	} else if (typeof err === "string") {
		message = t(store, err).str;
	}

	if (showNotice) {
		Notification.success({
			title: title,
			message: message
		});
	}
}

/*export function QSpinTimer(input, msg='') {
	return new Promise(function (resolve) {
		const time = input;

		let spintime = 0;
		let fetchinterval = '';

		const loading = Loading.service({
			lock: true,
			text: t(store, "Spin_left", ['', (time)]).cap,
			//spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.3)',
		});

		if (msg != '') {
			Notification.info({
				title: "Notification",
				message: msg,
				duration: (time-0.5) * 1000
			});
		}
		fetchinterval = setInterval(function(){
			spintime++;
			loading.text = t(store, "Spin_left", ['', (time-spintime)]).cap
			if (spintime === time) {
				loading.close();
				clearInterval(fetchinterval);
				resolve(1)
			}
		}, 1000);
	})
}*/

/* @SDPARK, 20230824. JIRA MGAR1840-87 Maintain the loading page when refreshing after setting the function*/
export function QSpinTimer(input, msg='') {
	return new Promise(function (resolve) {
		let time;
		const startTime = sessionStorage.getItem('startTime');

		if (startTime) {
			const currentTime = new Date().getTime();
			const timeElapsed = Math.floor((currentTime - startTime) / 1000);
			time = input - timeElapsed;
		} else {
			time = input;
			const currentTime = new Date().getTime();
			sessionStorage.setItem('startTime', currentTime);
		}

		let spintime = 0;
		let fetchinterval = '';

		let loadval = '';
		loadval = Loading.service({
			lock: true,
			text: t(store, "Spin_left", ['', (time)]).cap,
			background: 'rgba(0, 0, 0, 0.3)',
		});
		const loading = loadval;

		if (msg != '') {
			Notification.info({
				title: "Notification",
				message: msg,
				duration: (time-0.5) * 1000
			});
		}

		fetchinterval = setInterval(function(){
			spintime++;
			loading.text = t(store, "Spin_left", ['', (time-spintime)]).cap

			if (spintime >= time) {
				loading.close();
				clearInterval(fetchinterval);
				sessionStorage.removeItem('startTime');
				resolve(1);
			}
		}, 1000);
	})
}

/* 2024-01-05 DHLEE Wait for Setting Complete */
let wait_set = true
export function QSpinTimerMore() {
	return new Promise(function (resolve) {
		let loadval = '';
		let dot = '.'
		let count = 0
		loadval = Loading.service({
			lock: true,
			text: t(store, "Spin_left_1", ['', dot]).cap,
			background: 'rgba(0, 0, 0, 0.3)',
		});
		const loading = loadval;
		let fetchinterval = '';
		fetchinterval = setInterval(function(){
			count++
			if (!wait_set) {
				loading.close();
				clearInterval(fetchinterval);
				sessionStorage.removeItem('startTime');
				resolve(1);
			}
			if (count % 3 == 0)
				dot = '.'
			else if (count % 3 == 1)
				dot = '..'
			else
				dot = '...'
			loading.text = t(store, "Spin_left_1", ['', dot]).cap
		}, 1000);
	})
}
/* 2024-01-05 DHLEE get/set Setting Complete */
export function getQSpinTimerWait() {
	return wait_set
}

export function setQSpinTimerWait(value = false) {
	wait_set = value
}

export function QSpinshow() {
	Loading.service({
		background: 'rgba(0, 0, 0, 0.3)'
	});
}

export function QSpinhide() {
	Loading.service().close()
}

export function reportSuccess(success) {
	let title = t(store, "success").cap;
	let desc = null;

	if (success && typeof success === "object") {
		if (success.title) {
			title = success.title;
		}
		if (success.desc) {
			desc = success.desc;
		}
	}

	Notification.success({
		title: title
	});
}

export function reportNotice(err) {
	let message = t(store, "err-loading-data").str;
	let title = t(store, "Notice").cap;

	if (err && typeof err === "object") {
		if (err.message) {
			message = err.message;
		} else if (err.desc) {
			message = err.desc;
		}

		if (err.title) {
			title = err.title;
		}
	} else if (typeof err === "string") {
		message = t(store, err).str;
	}

	if (showNotice) {
		Notification.info({
			title: title,
			message: message
		});
	}
}

export function humanizeUnits(
	input,
	multiplier = 1024,
	units = ["B", "KB", "MB", "GB"]
) {
	input = isNaN(input) ? 0 : input;
	const formatted = {
		value: null,
		sign: "",
		str: "",
	};
	let val;

	if (input < multiplier) {
		val = Math.round(input);
		formatted.sign = units[0];
	} else if (input < Math.pow(multiplier, 2)) {
		val = input / multiplier;
		formatted.sign = units[1];
	} else if (input < Math.pow(multiplier, 3)) {
		val = input / Math.pow(multiplier, 2);
		formatted.sign = units[2];
	} else {
		val = input / Math.pow(multiplier, 3);
		formatted.sign = units[3];
	}

	formatted.value = Math.round(val * 10) / 10;
	formatted.str = formatted.value + formatted.sign;

	return formatted;
}

export function serverAddresses() {
	// eslint-disable-next-line no-undef
	let addr = CONFIG.serverAddress.split(/:(.+)/)[1];
	// eslint-disable-next-line no-undef
	let proto = CONFIG.serverAddress.split(/:(.+)/)[0];

	if (!addr) {
		addr = window.location.host;
		proto = window.location.protocol.slice(0, 5) || "https"; // fallback
	}
	return proto === "https"
		? { http: `https://${addr}`, ws: `wss://${addr}/wss` }
		: { http: `http://${addr}`, ws:  `ws://${addr}/ws` };
}

// http://lea.verou.me/2016/12/resolve-promises-externally-with-this-one-weird-trick/
export function defer() {
	let res, rej;

	const promise = new Promise((resolve, reject) => {
		res = resolve;
		rej = reject;
	});

	promise.resolve = res;
	promise.reject = rej;

	return promise;
}

// TODO: move this call to vuex
export const getConnectedDevices = () => {
	return new Promise((resolve, reject) => {
		ws.call(RPC.devices.getAll)
			.then(({ dict }) => {
				resolve(dict.result);
			})
			.catch(reject);
	});
};

export function hexToRGB(hex, alpha) {
	if (!hex) {
		return "rgb(0, 145, 234)";
	}
	var r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	} else {
		return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}

export class Category {
	constructor(obj) {
		this.category_type = obj.category_type;
		this.category_id = obj.category_id;
		this.category_name = obj.category_name;
		this.description = obj.description;
		this.items = obj.items;
	}
}

export class Host {
	constructor(raw) {
		this.category_type = raw.category_type;
		this.category_id = raw.category_id;
		this.hostname = raw.hostname;
		this.enabled = raw.enabled;
	}
}

export class Filter {
	constructor(obj) {
		this.filter_type = obj.filter_type;
		this.filter_id = obj.filter_id;
		this.filter_name = obj.filter_name;
		this.description = obj.description;
		this.ui_color = obj.ui_color || "#BBBBBB";
		this.items = obj.items;
	}
}
export class FilterSimple {
	constructor(array) {
		this.filter_type = array[0];
		this.filter_id = array[1];
		this.filter_name = array[2];
		this.description = array[3];
	}
}

export class Device {
	constructor(raw, options = {}) {
		this.mac = raw.mac;
		if (options.group) {
			this.hostname = raw.dhcp_hostname || raw.user_hostname;
			this.ip = raw.ipv4 || raw.ipv6;
			this.os_type = raw.os_type || "other";
			this.pc_safe_search = raw.pc_safe_search;
			// this.group_id = raw[7]
			this.pc_filter_type = raw.filter_type;
			this.pc_filter_id = raw.filter_id;
			this.uuid = raw.uuid;
			this.ui_color = raw.ui_color;
			return;
		}
		this.ipv4 = raw.ipv4;
		this.ipv6 = raw.ipv6;
		this.os_type = raw.os_type || "other";
		this.dhcp_hostname = raw.dhcp_hostname;
		this.user_hostname = raw.user_hostname;
		this.first_seen = raw.first_seen;
		this.last_seen = raw.last_seen;
		this.pc_filter_type = raw.pc_filter_type;
		this.pc_filter_id = raw.pc_filter_id;
		this.pc_safe_search = raw.pc_safe_search;
		this.device_group_uuid = raw.device_group_uuid;
		this.if_name = raw.if_name;
		this.if_type = raw.if_type;
		this.active = raw.active;
	}
}

export class Group {
	constructor(obj) {
		this.uuid = obj.uuid;
		this.name = obj.name;
		this.last_name = obj.last_name;
		this.email = obj.email;
		this.icon = obj.icon;
	}
}

export function uploadFile(file, options = {}) {
	return new Promise((resolve, reject) => {
		const chunkSize = options.chunk || 1000000;
		const filesize = file.size;
		const onProgress = options.onProgress;
		const destPath = options.destPath || "/tmp/upload";
		let offset = 0;

		const sendChunk = function (chunk, first) {
			getBase64(chunk).then((chunk64) => {
				const params = {
					method: "upload",
					params: {
						msg: {
							path: destPath,
							chunk: chunk64,
							append: false
						}
					},
				};
				return ws.call(params);
			});
		};

		const chunkReadHandler = (e) => {
			if (e.target.error == null) {
				offset += chunkSize;
				const progress = offset > filesize ? 100 : (offset / filesize) * 100;
				const chunkData = e.target.result.split(",")[1];

				sendChunk(chunkData, offset == chunkSize).then(
					({ list }) => {
						if (list[0] && list[0] != 0) {
							return reject("Error uploading file");
						}

						if (onProgress) {
							onProgress(progress);
						}

						if (offset >= filesize) {
							return resolve();
						}

						chunkFile(offset, chunkSize, file);
					},
					(err) => reject(err)
				);
			} else {
				return reject(e.target.error);
			}
		};

		const chunkFile = (_offset, length, _file) => {
			const reader = new FileReader();
			const blob = _file.slice(_offset, length + _offset);
			reader.onload = chunkReadHandler;
			reader.readAsDataURL(blob);
		};

		chunkFile(offset, chunkSize, file);
	});
}

// https://stackoverflow.com/questions/15987750/equivalent-of-inet-aton-in-mongodb/21559595#21559595
export function inet_aton(ip) {
	var a = ip.split(".");
	var buffer = new ArrayBuffer(4);
	var dv = new DataView(buffer);
	for (var i = 0; i < 4; i++) {
		dv.setUint8(i, a[i]);
	}
	return dv.getUint32(0);
}

export function inet_ntoa(num) {
	var nbuffer = new ArrayBuffer(4);
	var ndv = new DataView(nbuffer);
	ndv.setUint32(0, num);

	var a = new Array();
	for (var i = 0; i < 4; i++) {
		a[i] = ndv.getUint8(i);
	}
	return a.join(".");
}

// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
export function base64toBlob(b64Data, contentType = "", sliceSize = 512) {
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}
	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
}

export function removeEmptyStrings(obj) {
	let newObj = {};
	Object.keys(obj).forEach((prop) => {
		if (obj[prop] !== "") {
			newObj[prop] = obj[prop];
		}
	});
	return newObj;
}

export function isEmpty(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export async function digestMessage(message) {
	return {
		sha256_value: sha256(message),
		encrypt_value: encrypt_aes256_base64(message),
	};
}

export function encrypt_aes256(message, key) {
	var ciphertext = CryptoJS.AES.encrypt(message, key);

	return ciphertext.toString();
}

export function decrypt_aes256(message, key) {
	var plaintext = CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);

	return plaintext;
}

function encrypt_aes256_base64(message) {
	// openssl binary key hex value
	var privateKey =
		"888f04667d6bc5fb53cb5dae1b89b4d85a902a6d301022fc052b41303d85f3ee";
	// openssl binary iv hex value
	var iv = "54542e43a4abc6cf9c8bf53b5f2abfa8";

	// convert message, key, iv
	// aes 256 cbc encrypt
	var encrypted = CryptoJS.AES.encrypt(
		CryptoJS.enc.Utf8.parse(message),
		CryptoJS.enc.Hex.parse(privateKey),
		{ iv: CryptoJS.enc.Hex.parse(iv) }
	);

	return encrypted.toString();
}

// https://stackoverflow.com/questions/59777670/how-can-i-hash-a-string-with-sha256-in-js
// implemented to avoid calling crypto.subtle
var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value >>> amount) | (value << (32 - amount));
	}
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = "length";
	var i, j;
	var result = "";

	var words = [];
	var asciiBitLength = ascii[lengthProperty] * 8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = (sha256.h = sha256.h || []);
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = (sha256.k = sha256.k || []);
	var primeCounter = k[lengthProperty];

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
			k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
		}
	}

	ascii += "\x80"; // Append Ƈ' bit (plus zero padding)
	while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00"; // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j >> 8) return; // ASCII check: only accept characters in range 0-255
		words[i >> 2] |= j << (((3 - i) % 4) * 8);
	}
	words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
	words[words[lengthProperty]] = asciiBitLength;

	// process each chunk
	for (j = 0; j < words[lengthProperty]; ) {
		var w = words.slice(j, (j += 16)); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if
			var w15 = w[i - 15],
				w2 = w[i - 2];

			// Iterate
			var a = hash[0],
				e = hash[4];
			var temp1 =
				hash[7] +
				(rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + // S1
				((e & hash[5]) ^ (~e & hash[6])) + // ch
				k[i] +
				// Expand the message schedule if needed
				(w[i] =
					i < 16
					? w[i]
					: (w[i - 16] +
						(rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + // s0
						w[i - 7] +
						(rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | // s1
					0);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 =
				(rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + // S0
				((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

			hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1) | 0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i]) | 0;
		}
	}

	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i] >> (j * 8)) & 255;
			result += (b < 16 ? 0 : "") + b.toString(16);
		}
	}
	return result;
};

// https://stackoverflow.com/questions/8126466/how-do-i-reset-the-setinterval-timer
export function Timer(fn, t) {
	var timerObj = setInterval(fn, t);

	this.stop = function () {
		if (timerObj) {
			clearInterval(timerObj);
			timerObj = null;
		}
		return this;
	};

	// start timer using current settings (if it's not already running)
	this.start = function () {
		if (!timerObj) {
			this.stop();
			timerObj = setInterval(fn, t);
		}
		return this;
	};

	// start with new or original interval, stop current interval
	this.reset = function (newT = t) {
		t = newT;
		return this.stop().start();
	};
}

export function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () =>
			resolve(reader.result.replace(/^data:.+;base64,/, ""));
		reader.onerror = (error) => reject(error);
	});
}

export function calUnit(data, base="B", start=1) {
	let units = [[1024, ' K'+base], [1024**2, " M"+base], [1024**3, " G"+base], [1024**4, " T"+base], [1024**5, " P"+base]]
	let byte = parseInt(data)

	let unit = ''
	let value = byte
	for (let i = start-1; i < units.length; i++) {
		if (Math.floor(byte / units[i][0]) > 0) {
			value = (byte / units[i][0]).toFixed(2)
			unit = units[i][1]
		}
	}
	if (unit == '')
		return value.toString()
	else
		return value.toString() + unit
}

export function calDate(date) {
	let secs = parseInt(date)
	let day = (Math.floor(secs / (3600*24))).toString()
	let hour = (Math.floor((secs % (3600*24)) / 3600)).toString()
	let minute = (Math.floor((secs % (3600*24)) % 3600 / 60)).toString()
	let second = Math.floor((secs % (3600*24)) % 3600 % 60)

	let start = false
	let retDate = ''
	if (day != '0') {
		retDate += day+"D "
		start = true
	}
	if (hour != '0' || start) {
		retDate += hour+"H "
		start = true
	}
	if (minute != '0' || start) {
		retDate += minute+"M "
		start = true
	}
	retDate += second+"S"

	return retDate
}

export async function fetchCsrfToken() {
	try {
		const response = await axios.get(serverAddresses().http + '/csrf-token')
		return response.headers['x-csrf-token']
	} catch (error) {
		console.error('Error fetching CSRF token:', error)
		return null
	}
}
