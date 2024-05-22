import { ActionContext } from 'vuex'
import { FirewallBlacklistMode, FirewallRedirectTarget, FirewallState } from '@/store/firewall/types';
import { RPC } from "@/shared/constants";
import { UciFirewallRedirect, UciFirewallRule } from '@/shared/lib/uci/firewall';

type Context = ActionContext<FirewallState, any>

// TODO: Maybe replace all of these loading actions with a single loadConfig
//       that loads the whole firewall config, and then uses getters to
//       return just the required parts

export async function loadDefaults (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('DEFAULTS_SET_LOADING', true)
	try {
		const { dict: { values } } = await ws.call(RPC.firewall.get)
		if (!values) {
			return
		}
		const [[_, value]] = Object.entries(values);

		commit('SET_DEFAULTS', value)
	} catch (e) {
		reportError(e)
	} finally {
		commit('DEFAULTS_SET_LOADING', false)
	}
}

export async function setDefaults(ctx: Context, changes: object) {
	const {commit, rootGetters, state} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('DEFAULTS_SET_LOADING', true)
	try {
		await ws.call(RPC.firewall.set, {
			section: state.defaults['.name'],
			values: {
				...changes
			}
		})
	} catch (e) {
		reportError(e)
	} finally {
		commit('DEFAULTS_SET_LOADING', false)
	}
}

export async function loadBlacklistMode (ctx: Context) {
	const { commit, rootGetters } = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('BL_MODE_SET_LOADING', true)
	try {
		const { dict: { values } } = await ws.call(RPC.firewall.get, { type: 'forwarding' })
		if (!values) {
			return
		}

		for (let key in values) {
			const config = values[key]
			// Here we're handling just the default forwarding: `lan -> wan`
			// What to do with other definitions if present, like `guest -> wan` on (at least) pg2449
			if (config['.anonymous']) {
				commit('SET_FORWARDING_CONFIG', config)
				break
			}
		}
	} catch (e) {
		reportError(e)
	} finally {
		commit('BL_MODE_SET_LOADING', false)
	}
}

export async function setBlacklistMode (ctx: Context, mode: FirewallBlacklistMode) {
	const {commit, rootGetters, state} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	if (!state.forwardingConfig) {
		reportError('firewall-filtering-mode-not-loaded')
		return
	}

	const fwdEnabled = mode === FirewallBlacklistMode.BLACKLIST ? '1' : '0'

	commit('BL_MODE_SET_LOADING', true)
	try {
		await ws.call(RPC.firewall.set, {
			section: state.forwardingConfig['.name'],
			values: {
				enabled: fwdEnabled
			}
		})
	} catch (e) {
		reportError(e)
	} finally {
		commit('BL_MODE_SET_LOADING', false)
	}
}

export async function loadFilteringRules (ctx: Context) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('FILTERING_RULES_SET_LOADING', true)
	try {
		const {dict: {values}} = await ws.call(RPC.firewall.rule.get)
		if (!values || values.length == 0) {
			return
		}

		const rules = Object.keys(values)
			.map(k => values[k])

		commit('SET_FILTERING_RULES', rules)

	} catch (e) {
		reportError(e)
	} finally {
		commit('FILTERING_RULES_SET_LOADING', false)
	}
}

export async function saveFilteringRule(ctx: Context, {rule, changes}: {rule: UciFirewallRule, changes: object}) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	const existingRule = rule[".name"] && rule[".name"].length > 0
	const method = existingRule ? RPC.firewall.rule.set : RPC.firewall.rule.add


	commit('FILTERING_RULES_SET_LOADING', true)
	try {
		let params: any = {
			values: {
				...changes,
			}
		}
		if (existingRule) {
			params.section = rule['.name']
		}

		await ws.call(method, params)
	} catch (e) {
		reportError(e)
	} finally {
		commit('FILTERING_RULES_SET_LOADING', false)
	}
}

export async function deleteFilteringRule(ctx: Context, rule: UciFirewallRule) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']
	const existingRule = rule[".name"] && rule[".name"].length > 0

	commit('FILTERING_RULES_SET_LOADING', true)
	try {
		if (!existingRule) {
			throw 'nonexistent-rule'
		}

		const params = {
			section: rule['.name'],
		}
		await ws.call(RPC.firewall.rule.delete, params)
	} catch (e) {
		reportError(e)
	} finally {
		commit('FILTERING_RULES_SET_LOADING', false)
	}
}

export async function loadRedirects (ctx: Context) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('REDIRECTS_SET_LOADING', true)
	try {
		const {dict: {values}} = await ws.call(RPC.firewall.redirect.get)
		if (!values || values.length == 0) {
			return
		}

		const rules = Object.keys(values)
			.map(k => values[k])

		commit('SET_REDIRECTS', rules)

	} catch (e) {
		reportError(e)
	} finally {
		commit('REDIRECTS_SET_LOADING', false)
	}
}

export async function saveRedirect(ctx: Context, {redirect}: {redirect: UciFirewallRedirect}) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('REDIRECTS_SET_LOADING', true)
	try {
		let method = RPC.firewall.redirect.add

		const rule = {
			...Object.fromEntries(
				Object.entries(redirect).filter(([k]) => !['.anonymous', '.type', '.name', '.index'].includes(k))
			),
			target: FirewallRedirectTarget.DNAT,
		}

		let params: any = {
			values: rule
		}

		if (redirect['.name']) {
			method = RPC.firewall.redirect.set
			params.section = redirect['.name']
		}

		await ws.call(method, params)
	} catch (e) {
		reportError(e)
	} finally {
		commit('REDIRECTS_SET_LOADING', false)
	}
}
export async function deleteRedirectRule(ctx: Context, section: string) {
	const {commit, rootGetters} = ctx
	const ws = rootGetters['getConnection']
	const reportError = rootGetters['getErrorReporter']

	commit('FILTERING_RULES_SET_LOADING', true)
	try {
		await ws.call(RPC.firewall.portForwards.delete, {section})
	} catch (e) {
		reportError(e)
	} finally {
		commit('FILTERING_RULES_SET_LOADING', false)
	}
}
