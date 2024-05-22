import { NetworkState } from "./types";

const state: NetworkState = {
	arpLoading: false,
	arpRules: [],

	routesLoading: false,
	routes: [],

	networkLoading: false,
	devices: [],
	interfaces: [],
	staticRoutes: [],

	brctlLoading: false,
	brctlEntries: [],
}

export default state
