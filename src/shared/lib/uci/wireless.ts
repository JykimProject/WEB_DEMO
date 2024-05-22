import { UciSection, UciSectionDisabled } from '.';
import { HwAddr } from '@/store/network/types';

export enum HWMODE_FREQ {
	FREQ_24G = '11g',
	FREQ_5G = '11a'
}

export enum HWMODE_NAME {
	FREQ_24G = '2.4GHz',
	FREQ_5G = '5GHz'
}

export enum MACFILTER {
	DISABLE = 'disable',
	ALLOW = 'allow',
	DENY = 'deny'
}

export interface UciWifiIface extends UciSection {
	device?: string;
	ssid?: string;
	macfilter?: MACFILTER;
	maclist?: HwAddr[];
}

export interface UciWifiDevice extends UciSection {
	disabled?: UciSectionDisabled;
	macaddr?: HwAddr;
	hwmode?: HWMODE_FREQ;
}

export interface UciWifiGlobal extends UciSection {
	bandsteer?: string;
	mesh?: string;
	bhsta_ifnames?: string;
}
