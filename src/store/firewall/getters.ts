import {
	FirewallBlacklistMode,
	FirewallRuleCategory,
	FirewallState
} from "@/store/firewall/types";
import { ruleTypeVerifier } from "@/store/firewall/utils";
import { UciFirewallDefaults, UciFirewallRedirect, UciFirewallRule } from '@/shared/lib/uci/firewall';

export function getDefaultsLoading(state: FirewallState): boolean {
	return state.defaultsLoading
}

export function getDefaults(state: FirewallState): UciFirewallDefaults {
	return state.defaults
}

export function getBLModeLoading(state: FirewallState): boolean {
	return state.forwardingConfigLoading
}

export function getBlacklistMode(state: FirewallState): FirewallBlacklistMode | null {
	if (!state.forwardingConfig) {
		return null
	}

	if (state.forwardingConfig.enabled == '1') {
		return FirewallBlacklistMode.BLACKLIST
	}

	return FirewallBlacklistMode.WHITELIST
}

export function getFilteringRulesLoading(state: FirewallState): boolean {
	return state.filteringRulesLoading
}

export function getMacFilteringRules(state: FirewallState): UciFirewallRule[] {
	return state.filteringRules.filter((r: UciFirewallRule): boolean => {
		return r.src_mac != undefined && r.src_mac.length != 0
	})
}

export function getPortFilteringRules(state: FirewallState): UciFirewallRule[] {
	return state.filteringRules.filter(ruleTypeVerifier(FirewallRuleCategory.PORT_FILTERING))
}

export function getIpFilteringRules(state: FirewallState): UciFirewallRule[] {
	return state.filteringRules.filter(ruleTypeVerifier(FirewallRuleCategory.IP_FILTERING))
}

export function getRedirectsLoading(state: FirewallState): boolean {
	return state.redirectsLoading
}

export function getRedirects(state: FirewallState): UciFirewallRedirect[] {
	return state.redirects
}
