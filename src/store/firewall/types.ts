import {
	UciFirewallDefaults,
	UciFirewallForwardingConfig,
	UciFirewallRedirect,
	UciFirewallRule
} from '@/shared/lib/uci/firewall';

export enum FirewallBlacklistMode {
	BLACKLIST = 'BLACKLIST',
	WHITELIST = 'WHITELIST'
}

export enum FirewallRuleAction {
	ACCEPT = 'ACCEPT',
	REJECT = 'REJECT',
	DROP = 'DROP'
}

export enum FirewallRedirectTarget {
	DNAT= 'DNAT'
}

export enum FirewallRuleCategory {
	IP_FILTERING,
	MAC_FILTERING,
	PORT_FILTERING,
}

export interface FirewallState {
	forwardingConfigLoading: boolean;
	forwardingConfig?: UciFirewallForwardingConfig;

	filteringRulesLoading: boolean;
	filteringRules: UciFirewallRule[];

	redirectsLoading: boolean;
	redirects: UciFirewallRedirect[];

	defaultsLoading: boolean;
	defaults: UciFirewallDefaults;
}
