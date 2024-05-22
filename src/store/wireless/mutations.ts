import Vue from 'vue'
import { WirelessState } from "./types";
import { UciWifiDevice, UciWifiIface, UciWifiGlobal } from '@/shared/lib/uci/wireless';

export function IFACES_SET_LOADING(state: WirelessState, loading: boolean) {
	state.wifiIfacesLoading = loading
}

export function SET_IFACES(state: WirelessState, ifaces: UciWifiIface[]) {
	Vue.set(state, 'wifiIfaces', [...ifaces])
}

export function DEVICES_SET_LOADING(state: WirelessState, loading: boolean) {
	state.wifiDevicesLoading = loading
}

export function SET_DEVICES(state: WirelessState, devices: UciWifiDevice[]) {
	Vue.set(state, 'wifiDevices', [...devices])
}

export function GLOBAL_SET_LOADING(state: WirelessState, loading: boolean) {
	state.wifiGlobalLoading = loading
}

export function SET_GLOBAL(state: WirelessState, global: UciWifiGlobal[]) {
	Vue.set(state, 'wifiGlobal', [...global])
}
