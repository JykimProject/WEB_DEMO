import Vue from 'vue'
import {
	FirewallState
} from "@/store/firewall/types";
import {
	UciFirewallDefaults,
	UciFirewallForwardingConfig,
	UciFirewallRedirect,
	UciFirewallRule
} from '@/shared/lib/uci/firewall';

export function BL_MODE_SET_LOADING(state: FirewallState, loading: boolean) {
	state.forwardingConfigLoading = loading
}

export function FILTERING_RULES_SET_LOADING(state: FirewallState, loading: boolean) {
	state.filteringRulesLoading = loading
}

export function SET_FORWARDING_CONFIG(state: FirewallState, config: UciFirewallForwardingConfig) {
	Vue.set(state, 'forwardingConfig', {...config})
}

export function SET_FILTERING_RULES(state: FirewallState, rules: UciFirewallRule[]) {
	Vue.set(state, 'filteringRules', [...rules])
}

export function REDIRECTS_SET_LOADING(state: FirewallState, loading: boolean) {
	state.redirectsLoading = loading
}

export function SET_REDIRECTS(state: FirewallState, redirects: UciFirewallRedirect[]) {
	Vue.set(state, 'redirects', [...redirects])
}

export function DEFAULTS_SET_LOADING(state: FirewallState, loading: boolean) {
	state.defaultsLoading = loading
}

export function SET_DEFAULTS(state: FirewallState, defaults: UciFirewallDefaults) {
	Vue.set(state, 'defaults', {...defaults})
}
