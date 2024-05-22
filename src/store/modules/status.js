import Vue from 'vue'

const state = {
	sidebar: {
		open: false
	},
	modal: {
		open: 0
	},
	radarPcModal: {
		use: false,
		mac: null,
	},
	newDeviceScanned: {
		// toggles between true and false
		// every time new device gets scanned
		value: false
	},
	device: {
		path: ''
	},
	newMessage: false,
}

const mutations = {
	SET_STATUS (state, { path, val }) {
		const split = path.split('.')
		let key = split.pop()
		let obj = state

		split.forEach(key => {
			obj = obj[key]
		})

		Vue.set(obj, key, val)
	}
}

export default {
	state,
	mutations,
}
