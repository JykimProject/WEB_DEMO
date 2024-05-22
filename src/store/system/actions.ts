import { ActionContext } from 'vuex'
import { RPC } from "@/shared/constants";
import { SystemState } from "./types";
import { normalizeUciResponse, UciSection } from '@/shared/lib/uci';
import {
	UciSystemSystem,
	UciSystemTimeserver
} from '@/shared/lib/uci/system';

type Context = ActionContext<SystemState, any>

export async function loadSystemConfig (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('SYSTEM_SET_LOADING', true)
	try {
		const { dict } = await ws.call(RPC.system.get)
		if (!dict) {
			return
		}

		commit('SET_SYSTEM_SECTIONS', normalizeUciResponse(dict.values))
	} catch (e) {
		reportError(e)
	} finally {
		commit('SYSTEM_SET_LOADING', false)
	}
}

export async function saveTimeserver(ctx: Context, {rule, changes}: {rule: UciSystemTimeserver, changes: any}) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('SYSTEM_SET_LOADING', true)
	try {
		let params: any = {
			section: rule['.name'],
			values: {
				...changes
			}
		}

		await ws.call(RPC.system.set, params)
	} catch (e) {
		reportError(e)
		throw e
	} finally {
		commit('SYSTEM_SET_LOADING', false)
	}
}

export async function saveSystemConfig(ctx: Context, {section, changes}: {section: UciSystemSystem, changes: any}) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('SYSTEM_SET_LOADING', true)
	try {
		let params: any = {
			section: section['.name'],
			values: {
				...changes
			}
		}

		await ws.call(RPC.system.set, params)
	} catch (e) {
		reportError(e)
		throw e
	} finally {
		commit('SYSTEM_SET_LOADING', false)
	}
}
