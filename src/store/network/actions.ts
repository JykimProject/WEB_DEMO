import { ActionContext } from 'vuex'
import { RPC } from "@/shared/constants";
import { parseArpTable } from "./helpers";
import { NetworkState } from "./types";
import { UciSection } from '@/shared/lib/uci';
import {
	SECTION_TYPE,
	UciNetDevice,
	UciNetInterface,
	UciNetStaticRoute,
	UciNetStaticRoute6,
	UciNetworkSection
} from '@/shared/lib/uci/network';
import { UciFirewallRule } from '@/shared/lib/uci/firewall';

type Context = ActionContext<NetworkState, any>

export async function loadArpRules (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('ARP_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.network.arp)
		if (!dict) {
			return
		}
		const arpRules = parseArpTable(dict.data)
		commit('SET_ARP_RULES', arpRules)
	} catch (e) {
		reportError(e)
	} finally {
		commit('ARP_SET_LOADING', false)
	}
}

export async function loadRoutes (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('ROUTES_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.network.routes)
		if (!dict) {
			return
		}
		// Maybe handle errors?
		const routes = dict
		commit('SET_ROUTES', routes)
	} catch (e) {
		reportError(e)
	} finally {
		commit('ROUTES_SET_LOADING', false)
	}
}

export async function loadNetworkConfig(ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('NETWORK_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.network.get)
		if (!dict) {
			return
		}

		type uciEntry = [string, UciNetworkSection]
		type uciNetworkAcc = { devices: UciNetDevice[], interfaces: UciNetInterface[], routes: UciNetStaticRoute[]}

		const  networkConfig = Object.entries(dict.values as {[key: string]: UciNetworkSection}).reduce((acc: uciNetworkAcc, [name, value]: uciEntry) => {
			let { devices, interfaces, routes } = acc

			switch (value['.type']) {
			case SECTION_TYPE.DEVICE:
				devices = [...devices, value]
				break;
			case SECTION_TYPE.INTERFACE:
				interfaces = [...interfaces, value]
				break;
			case SECTION_TYPE.ROUTE:
			case SECTION_TYPE.ROUTE6:
				// @ts-ignore-next-line
				routes = [...routes, value]
				break;
			}

			return { devices, interfaces, routes }
		}, { devices: [], interfaces: [], routes: [] })

		commit('SET_NETWORK_CONFIG', networkConfig)
	} catch (e) {
		reportError(e)
	} finally {
		commit('NETWORK_SET_LOADING', false)
	}
}

export async function saveStaticRoute4(ctx: Context, {rule, changes}: {rule: UciNetStaticRoute, changes: any}) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	const existingRule = rule[".name"] && rule[".name"].length > 0
	const method = existingRule ? RPC.network.set : RPC.network.add

	commit('NETWORK_SET_LOADING', true)
	try {
		let params: any = {
			type: SECTION_TYPE.ROUTE,
			values: {
				...changes
			}
		}
		if (existingRule) {
			params.section = rule['.name']
		}

		await ws.call(method, params)
	} catch (e) {
		reportError(e)
		throw e
	} finally {
		commit('NETWORK_SET_LOADING', false)
	}
}

export async function saveStaticRoute6(ctx: Context, {rule, changes}: {rule: UciNetStaticRoute6, changes: any}) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	const existingRule = rule[".name"] && rule[".name"].length > 0
	const method = existingRule ? RPC.network.set : RPC.network.add

	commit('NETWORK_SET_LOADING', true)
	try {
		let params: any = {
			type: SECTION_TYPE.ROUTE6,
			values: {
				...changes
			}
		}
		if (existingRule) {
			params.section = rule['.name']
		}

		await ws.call(method, params)
	} catch (e) {
		reportError(e)
		throw e
	} finally {
		commit('NETWORK_SET_LOADING', false)
	}
}

export async function deleteSection(ctx: Context, rule: UciSection) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']
	const existingRule = rule[".name"] && rule[".name"].length > 0

	commit('NETWORK_SET_LOADING', true)
	try {
		if (!existingRule) {
			throw 'nonexistent-rule'
		}

		const params = {
			section: rule['.name'],
		}
		await ws.call(RPC.network.delete, params)
	} catch (e) {
		reportError(e)
	} finally {
		commit('NETWORK_SET_LOADING', false)
	}
}

export async function loadBrctl (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('BRCTL_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.bridge.macTable)
		if (!dict) {
			return
		}

		commit('SET_BRCTL_MACS', dict.result.brctl_macs)
	} catch (e) {
		reportError(e)
	} finally {
		commit('BRCTL_SET_LOADING', false)
	}
}
