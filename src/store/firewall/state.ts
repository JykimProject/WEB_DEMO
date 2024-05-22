import { FirewallState } from "./types";

const state: FirewallState = {
	forwardingConfigLoading: false,

	filteringRulesLoading: false,
	filteringRules: [],

	redirectsLoading: false,
	redirects: [],

	defaultsLoading: false,
	defaults: {}
}

export default state
