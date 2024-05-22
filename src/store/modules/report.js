const state = {
	report: [],
	idx: 0
}

const getters = {
	GET_REPORT: state => state.report,
	GET_REPORTCOUNT: state => state.report.length
}

const mutations = {
	SET_REPORT (state, payload) {
		state.report.unshift(payload.report)
	},
	REMOVE_REPORT (state, payload) {
		state.report.splice(payload.idx, 1)
	},
	CHANGE_REPORT (state, payload) {
		state.report = payload.report
	}
}

export default {
	state,
	getters,
	mutations
}
