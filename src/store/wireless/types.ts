import { UciWifiDevice, UciWifiIface, UciWifiGlobal } from '@/shared/lib/uci/wireless';

export interface WirelessState {
	wifiIfacesLoading: boolean;
	wifiIfaces: UciWifiIface[];

	wifiDevicesLoading: boolean;
	wifiDevices: UciWifiDevice[];

	wifiGlobalLoading: boolean;
	wifiGlobal: UciWifiGlobal[];
}
