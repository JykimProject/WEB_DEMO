import Vue from 'vue'
import { ArpRule, BrctlMacEntry, IPRouteEntry, NetworkState } from "./types";
import { UciNetDevice, UciNetInterface, UciNetStaticRoute } from '@/shared/lib/uci/network';

export function ARP_SET_LOADING(state: NetworkState, loading: boolean) {
	state.arpLoading = loading
}

export function SET_ARP_RULES(state: NetworkState, rules: ArpRule[]) {
	Vue.set(state, 'arpRules', [...rules])
}

export function BRCTL_SET_LOADING(state: NetworkState, loading: boolean) {
	state.brctlLoading = loading
}

export function SET_BRCTL_MACS(state: NetworkState, entries: BrctlMacEntry[]) {
	Vue.set(state, 'brctlEntries', [...entries]);
}

export function ROUTES_SET_LOADING(state: NetworkState, loading: boolean) {
	state.routesLoading = loading
}

export function SET_ROUTES(state: NetworkState, routes: IPRouteEntry[]) {
	Vue.set(state, 'routes', [...routes])
}

export function NETWORK_SET_LOADING(state: NetworkState, loading: boolean) {
	state.networkLoading = loading
}

export function SET_NETWORK_CONFIG(state: NetworkState, { devices, interfaces, routes }: {devices: UciNetDevice[], interfaces: UciNetInterface[], routes: UciNetStaticRoute[]}) {
	if (devices) {
		state.devices = devices
	}

	if (interfaces) {
		state.interfaces = interfaces
	}

	if (routes) {
		state.staticRoutes = routes
	}
}
