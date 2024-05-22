import ws from '@/shared/lib/ws'
import { RPC } from '@/shared/constants'
import store from '@/store'
import { t } from '@/shared/functions'

// state object keys are
// identical with service
// names coming from server
// only difference is: they are
// snake cased in server, but
// transformed back and forth.
// So, changing key names for
// fun will BREAK functionality.
const state = {
	lan: {
		installed: true,
		enabled: true,
		icon: 'icon-devices',
		title: () => t(store, 'connected-devices').cap,
	},
	/*
	wan: {
		installed: true,
		enabled: true,
		icon: 'icon-wan',
		title: () => t(store, 'wan').str,
	},
	*/
	fileValidation: {
		installed: true,
		enabled: true,
		icon: 'icon-shield',
		title: () => t(store, 'sentinel-internet-security').title,
	},
	parentalControl: {
		installed: true,
		enabled: true,
		icon: 'icon-menu-parent',
		title: () => t(store, 'digital-parenting').title,
	},
	captivePortal: {
		installed: false,
		enabled: false,
		icon: 'icon-captive-portal',
		title: () => t(store, 'tiga-eleven-captive-portal').title,
	},
	angelcam: {
		installed: false,
		enabled: false,
		icon: 'ivu-icon ivu-icon-md-videocam',
		title: () => t(store, 'angelcam-cloud').title,
	},
	vpn: {
		installed: false,
		enabled: false,
		icon: 'ivu-icon ivu-icon-md-lock',
		title: () => t(store, 'secure-remote-access').title,
	}
}

const getters = {
	availableServices (state) {
		const result = {}

		Object.keys(state).forEach(service => {
			if (state[service].installed || state[service].enabled) {
				result[service] = state[service]
			}
		})

		// TODO: fix this
		// for some reason, 2 or less items
		// freeze browser without any errors
		if (Object.keys(result).length < 3) {
			return {}
		}

		return result
	}
}

const mutations = {
	SET_SERVICE_INSTALLED (state, { name, installed }) {
		if (state[name]) {
			state[name].installed = installed
		}
	},
	SET_SERVICE_ENABLED (state, { name, enabled }) {
		if (state[name]) {
			state[name].enabled = enabled
		}		
	}
}

const actions = {
	subscribeServiceUpdate ({ dispatch }) {
		return ws.subscribe(RPC.sqlTableModify.services.update, ({ list }) => {
			if (list[0].result.command === 'UPDATE') {
				return dispatch('updateServices')
			}
		})
	},
	updateServices ({ commit }) {
		return ws.call(RPC.sqlAliasExec.services.get).then(({ list:services }) => {
			services[0].forEach(service => {
				let [ name, installed, enabled ] = service

				// to camelCase
				name = name.replace(/([_]\w)/g, g => g[1].toUpperCase())

				commit('SET_SERVICE_INSTALLED', {name, installed: Boolean(installed)})
				commit('SET_SERVICE_ENABLED', {name, enabled: Boolean(enabled)})
			})
		})
	},
	enableService (context, serviceName) {
		// to snake_case
		serviceName = serviceName.replace(/[\w]([A-Z])/g, g => {
			return `${g[0]}_${g[1]}`
		}).toLowerCase()

		return ws.call(RPC.sqlAliasExec.services.enable, {
			statement_value: [[serviceName, 1]]
		})
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}
