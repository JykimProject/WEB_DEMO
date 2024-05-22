export default function wifiPass(input, params) {
	var bytes =
		encodeURI(input).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;

	if (params !== undefined && params.encryptionType === "wep") {
		if (isASCII(input)) {
			const ascii_wep_size = [5, 13];
			if (!ascii_wep_size.includes(bytes)) {
				return 4;
			}
		}
	} else if (params !== undefined && params.checkRepeatPass) {
		if (params.checkRepeatPass !== input) {
			return 5;
		}
	} else {
		if (bytes < 8 || bytes > 32) {
			return 1;
		}

		if (!isASCII(input)) {
			return 6;
		}
	}

	const moreThenTwoDifferentCharTypes = 2;
	function validatePassword(password) {
		var o = {
			lower: 1,
			upper: 1,
			numeric: 1,
			special: 1,
		};

		var re = {
				lower: /[a-z]/g,
				upper: /[A-Z]/g,
				numeric: /[0-9]/g,
				special: /[\W_]/g,
			},
			rule;

		// check type
		var type_count = 0;
		for (rule in re) {
			if ((password.match(re[rule]) || []).length >= o[rule]) type_count++;
		}

		if (type_count < moreThenTwoDifferentCharTypes) return false;

		return true;
	}

	if (validatePassword(input) != true) {
		return 7;
	}

	const moreThenTwoDifferentChars = 2;
	if (makeUnique(input).length <= moreThenTwoDifferentChars) {
		return 2;
	}

	var zxcvbn = require("zxcvbn");
	let results;
	const user_input_dict = ["kaonbroadband", "kaonrouter", "openwrt", "quantum"];
	results = zxcvbn(input, user_input_dict);
	let onlyOneWordFromCustomDict =
		results.sequence[0].dictionary_name === "user_inputs" &&
		results.sequence.length === 1;
	let commonDictionaryWords = results.feedback && results.feedback.warning;
	if (commonDictionaryWords || onlyOneWordFromCustomDict) {
		return 3;
	}

	return 0;
}

function isASCII(str) {
	/* eslint-disable-next-line no-control-regex */
	return /^[\x00-\x7F]*$/.test(str);
}

function makeUnique(str) {
	return String.prototype.concat(...new Set(str));
}
