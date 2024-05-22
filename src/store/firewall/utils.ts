import { FirewallRuleCategory} from "@/store/firewall/types";
import { UciFirewallRule } from '@/shared/lib/uci/firewall';

// Maybe zones should be read in from somewhere else (e.g. state)
const lanZones = ['lan']
const wanZones = ['wan']

function isPortFiltering(rule: UciFirewallRule): boolean {
	return (
		lanZones.includes(rule.src!)
			&& wanZones.includes(rule.dest!)
			&& !!rule.dest_port
			&& !!rule.proto
	)
}

function isIpFiltering(rule: UciFirewallRule): boolean {
	return (
		lanZones.includes(rule.src!)
			&& wanZones.includes(rule.dest!)
			&& !!rule.src_ip
			&& !!rule.proto
	)
}

function isMacFiltering(rule: UciFirewallRule): boolean {
	throw 'not implemented'
}

export function ruleTypeVerifier(category: FirewallRuleCategory): ((rule: UciFirewallRule) => boolean) {
	switch (category) {
	case FirewallRuleCategory.PORT_FILTERING:
		return isPortFiltering
	case FirewallRuleCategory.IP_FILTERING:
		return isIpFiltering
	case FirewallRuleCategory.MAC_FILTERING:
		return isMacFiltering
	default:
		return () => false
	}
}
