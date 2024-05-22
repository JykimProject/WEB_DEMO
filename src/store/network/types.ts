import { UciNetDevice, UciNetInterface, UciNetStaticRoute } from '@/shared/lib/uci/network';

export type IpAddr = string
export type HwAddr = string

// This is based on https://superuser.com/questions/822054/definition-of-arp-result-flags
// and owrt kernel source code: https://github.com/openwrt/linux/blob/master/include/uapi/linux/if_arp.h#L127.
// It might be wrong, though.
export enum ArpFlag {
	INCOMPLETE = 0x0,
	COMPLETE = 0x02,
	PERMANENT = 0x04,
	PUBLISH = 0x08,
	USETRAILERS = 0x10,
	NETMASK = 0x20,
	DONTPUB = 0x40
}

export interface ArpRule {
	ipAddr: IpAddr;
	hwAddr: HwAddr;
	interfaceName: string;
	flags: ArpFlag[];
	flagsRaw: number;
}

type IPAddrWithMask = string
type IPRouteDst = IPAddrWithMask | "default"

export interface IPRouteEntry {
	dst: IPRouteDst;
	gateway: IpAddr;
	dev: string;
	protocol?: string;
	scope?: string;
	prefsrc?: IpAddr;
	flags?: any[];
}

export interface BrctlMacEntry {
	port: number;
	mac: HwAddr;
	virt: 'yes' | 'no';
	ageing_time: string;
}

export interface NetworkState {
	arpLoading: boolean;
	arpRules: ArpRule[];

	routesLoading: boolean;
	routes: IPRouteEntry[];

	networkLoading: boolean;
	devices: UciNetDevice[];
	interfaces: UciNetInterface[];
	staticRoutes: UciNetStaticRoute[];

	brctlLoading: boolean;
	brctlEntries: BrctlMacEntry[];
}
