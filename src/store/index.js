import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import ws from '@/shared/lib/ws'
import { reportError } from '@/shared/functions'

import i18n from './modules/i18n'
import form from './modules/form'
import error from './modules/error'
import status from './modules/status'
import user from './modules/user'
import scanned from './modules/scanned'
import services from './modules/services'
import report from './modules/report'

import firewall from './firewall'
import network from './network'
import wireless from './wireless'
import system from './system'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		i18n,
		form,
		error,
		status,
		user,
		scanned,
		services,
		firewall,
		network,
		wireless,
		system,
		report
	},
	getters: {
		getConnection: () => ws,
		getErrorReporter: () => reportError
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})
