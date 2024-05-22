import { UciSection } from '@/shared/lib/uci/index';
import { IpAddr } from '@/store/network/types';

export enum SECTION_TYPE {
	GLOBALS = 'globals',
	DEVICE = 'device',
	INTERFACE = 'interface',
	ROUTE = 'route',
	ROUTE6 = 'route6',
}

export interface UciNetworkSection extends UciSection {
	'.type'?: SECTION_TYPE;
}

export interface UciNetInterface extends UciNetworkSection {
	// TODO: Not complete
	ifname?: string;
	ipaddr?: IpAddr;
	netmask?: IpAddr;
	proto?: string;
}

export interface UciNetDevice extends UciNetworkSection {
	ifname?: string;
	mtu?: string;
	name?: string;
	type?: string;
}

export interface UciNetStaticRoute extends UciNetworkSection {
	interface: string;
	target: IpAddr;
	netmask: IpAddr;
	gateway: IpAddr;
}

export interface UciNetStaticRoute6 extends UciNetworkSection {
	interface: string;
	target: IpAddr;
	gateway: IpAddr;
}
