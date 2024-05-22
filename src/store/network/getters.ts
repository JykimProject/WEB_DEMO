import { ArpRule, BrctlMacEntry, IPRouteEntry, NetworkState } from "./types";
import { UciNetInterface, UciNetStaticRoute } from '@/shared/lib/uci/network';

export function getArpLoading(state: NetworkState): boolean {
	return state.arpLoading
}

export function getArpRules(state: NetworkState): ArpRule[] {
	return state.arpRules
}

export function getBrctlLoading(state: NetworkState): boolean {
	return state.brctlLoading
}

export function getBrctlMacs(state: NetworkState): BrctlMacEntry[] {
	return state.brctlEntries
}

export function getRoutesLoading(state: NetworkState): boolean {
	return state.routesLoading
}

export function getRoutes(state: NetworkState): IPRouteEntry[] {
	return state.routes
}

export function getInterfaces(state: NetworkState): UciNetInterface[] {
	return state.interfaces
}

export function getStaticRoutes(state: NetworkState): UciNetStaticRoute[] {
	return state.staticRoutes
}
