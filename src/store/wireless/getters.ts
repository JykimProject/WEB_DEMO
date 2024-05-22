import { WirelessState } from '@/store/wireless/types';
import { HWMODE_FREQ, UciWifiDevice, UciWifiIface, UciWifiGlobal } from '@/shared/lib/uci/wireless';

export function getDevicesLoading(state: WirelessState): boolean {
	return state.wifiDevicesLoading
}

export function getIfacesLoading(state: WirelessState): boolean {
	return state.wifiIfacesLoading
}

export function getGlobalLoading(state: WirelessState): boolean {
	return state.wifiGlobalLoading
}

export function getDevices(state: WirelessState): UciWifiDevice[] {
	return state.wifiDevices
}

export function getDevicesForFreq(state: WirelessState): (hwmode: HWMODE_FREQ) => UciWifiDevice[] {
	return hwmode => {
		return state.wifiDevices.filter(dev => dev.hwmode == hwmode)
	}
}

export function getIfaces(state: WirelessState): UciWifiIface[] {
	return state.wifiIfaces
}

export function getGlobal(state: WirelessState): UciWifiGlobal[] {
	return state.wifiGlobal
}

export function getIfacesForFreq(state: WirelessState): (hwmode: HWMODE_FREQ) => UciWifiIface[] {
	return hwmode => {
		const modeDevices = getDevicesForFreq(state)(hwmode).map(dev => dev['.name'])
		return state.wifiIfaces.filter(iface => modeDevices.includes(iface.device))
	}
}
