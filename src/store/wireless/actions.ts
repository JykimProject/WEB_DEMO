import { ActionContext } from 'vuex'
import { RPC } from "@/shared/constants";
import { WirelessState } from "./types";
import { MACFILTER, UciWifiIface } from '@/shared/lib/uci/wireless';
import { HwAddr } from '@/store/network/types';

type Context = ActionContext<WirelessState, any>

export async function loadIfaces (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('IFACES_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.wireless.iface.get)
		if (!dict) {
			return
		}

		const ifaces = Object.entries(dict.values || {}).map(([_, v]) => v)

		commit('SET_IFACES',  ifaces || [])
	} catch (e) {
		reportError(e)
	} finally {
		commit('IFACES_SET_LOADING', false)
	}
}

type SaveIfaceModeParams = {
	sectionName: string,
	mode: MACFILTER | 0
}
export async function saveIfaceMacfilterMode(ctx: Context, {sectionName, mode}: SaveIfaceModeParams) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	if (!sectionName) {
		throw 'please-select-ssid'
	}

	commit('IFACES_SET_LOADING', true)
	try {
		let method = RPC.wireless.iface.set
		let params: any = {
			section: sectionName,
		}

		switch (mode) {
		case 0:
			method = RPC.wireless.iface.delete
			params.option = 'macfilter'
			// check if the option even existed in order for frontend not to display error
			// "Not found" since we're actually not expecting to find anything
			if (!ctx.getters.getIfaces.find((i: UciWifiIface) => i['.name'] == sectionName).macfilter) {
				return
			}
			break;
		default:
			method = RPC.wireless.iface.set

			params.values = {
				macfilter: mode
			}
			params.section = sectionName
		}

		await ws.call(method, params)
	} catch (e) {
		reportError(e)
	} finally {
		commit('IFACES_SET_LOADING', false)
	}
}

type MacfilterEntryParams = {
	sectionName: string,
	mac: HwAddr
}
export async function addMacfilterEntry(ctx: Context, {sectionName, mac: inputMac}: MacfilterEntryParams) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	if (!sectionName) {
		throw 'please-select-ssid'
	}

	commit('IFACES_SET_LOADING', true)
	try {
		const mac = inputMac.toLowerCase()
		const section = ctx.getters.getIfaces.find((i: UciWifiIface) => i['.name'] == sectionName)
		const maclist: string[] = (section.maclist || []).map((s: string) => s.toLowerCase())
		const exists = maclist.includes(mac)

		if (exists) {
			// nothing to do
			return
		}

		const newMaclist = [...maclist, mac]

		let params: any = {
			section: sectionName,
			values: {
				maclist: newMaclist
			}
		}

		await ws.call(RPC.wireless.iface.set, params)
	} catch (e) {
		reportError(e)
	} finally {
		commit('IFACES_SET_LOADING', false)
	}
}


type DeleteMacfilterEntryParams = {
	sectionName: string,
	macs: HwAddr[]
}
export async function removeMacfilterEntry(ctx: Context, {sectionName, macs: macsToDelete}: DeleteMacfilterEntryParams) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	if (!sectionName) {
		throw 'please-select-ssid'
	}

	commit('IFACES_SET_LOADING', true)
	try {
		macsToDelete.forEach(mac => mac.toLowerCase())
		const section = ctx.getters.getIfaces.find((i: UciWifiIface) => i['.name'] == sectionName)
		const maclist: string[] = (section.maclist || []).map((s: string) => s.toLowerCase())
		const exists = maclist.some(m => macsToDelete.includes(m))

		if (!exists) {
			// nothing to do
			return
		}

		const newMaclist = maclist.filter((m) => !macsToDelete.includes(m))
		let params: any = {
			section: sectionName,
			values: {
				maclist: newMaclist
			}
		}
		if (newMaclist.length > 0) {
			let params: any = {
				section: sectionName,
				values: {
					maclist: newMaclist
				}
			}

			await ws.call(RPC.wireless.iface.set, params)
		} else {
			await ws.call(RPC.wireless.iface.delete, {
				section: sectionName,
				option: 'maclist'
			})
		}
	} catch (e) {
		reportError(e)
	} finally {
		commit('IFACES_SET_LOADING', false)
	}
}


export async function loadDevices (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('DEVICES_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.wireless.device.get)
		if (!dict) {
			return
		}

		const devices = Object.entries(dict.values || {}).map(([_, v]) => v)

		commit('SET_DEVICES',  devices || [])
	} catch (e) {
		reportError(e)
	} finally {
		commit('DEVICES_SET_LOADING', false)
	}
}

export async function loadGlobal (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('GLOBAL_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.wireless.global.get)
		if (!dict) {
			return
		}

		const global = Object.entries(dict.values || {}).map(([_, v]) => v)

		commit('SET_GLOBAL',  global || [])
	} catch (e) {
		reportError(e)
	} finally {
		commit('GLOBAL_SET_LOADING', false)
	}
}
