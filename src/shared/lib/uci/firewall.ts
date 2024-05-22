import { UciSection, UciSectionEnabled } from '@/shared/lib/uci/index';
import { HwAddr, IpAddr } from '@/store/network/types';
import { FirewallRedirectTarget, FirewallRuleAction } from '@/store/firewall/types';

// https://openwrt.org/docs/guide-user/firewall/firewall_configuration

export interface UciFirewallDefaults extends UciSection {
	syn_flood?: UciSectionEnabled
}

export interface UciFirewallForwardingConfig extends UciSection {
	dest?: string;
	src?: string;
	enabled?: string;
}

export interface UciFirewallRule extends UciSection {
	// These are not all the options, but only the ones used by the UI
	name?: string;
	src?: string;
	dest?: string;
	dest_ip?: IpAddr;
	dest_port?: string;
	src_mac?: HwAddr;
	src_ip?: IpAddr;
	src_port?: string;
	proto?: string;
	target?: FirewallRuleAction;
	enabled?: UciSectionEnabled;
}

export interface UciFirewallRedirect extends UciSection {
	name?: string;
	src?: string;
	src_ip?: IpAddr;
	src_dport?: string; // one port or a range
	dest?: string;
	dest_ip?: IpAddr;
	dest_port?: string; // one port or a range
	proto?: string;
	target?: FirewallRedirectTarget;
	enabled?: UciSectionEnabled;
}
