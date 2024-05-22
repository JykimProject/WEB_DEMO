const state = {
	loggedIn: false,
	isDefaultPassword: false
}

const getters = {
	user: () => () => {
		try {
			if ( sessionStorage.getItem('username') !== null || sessionStorage.getItem('id') !== null)
				return [
					sessionStorage.getItem('username'),
					sessionStorage.getItem('id')
				]
			else return []
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error reading user token', e)
			}
			return []
		}
	},
	sid: () => () => {
		try {
			if ( sessionStorage.getItem('sid') !== null)
				return sessionStorage.getItem('sid')
			else return ""
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error reading session id', e)
			}
			return []
		}
	},
	csrftoken: () => () => {
		try {
			if ( sessionStorage.getItem('csrftoken') !== null)
				return sessionStorage.getItem('csrftoken')
			else return ""
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error reading session csrftoken', e)
			}
			return []
		}
	},
	lastPage: () => () => {
		try {
			return sessionStorage.getItem('lastpage')
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error reading lastpage', e)
			}
			return null
		}
	},
	lastSubPage: () => () => {
		try {
			return sessionStorage.getItem('lastsubpage')
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error reading lastsubpage', e)
			}
			return null
		}
	},
	lastTabPage: () => () => {
		try {
			return sessionStorage.getItem('lasttabpage')
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error reading lasttabpage', e)
			}
			return null
		}
	},
	isLoggedIn: () => () => {
		return state.loggedIn
	},
	isDefaultPassword: () => () => {
		const isDefaultPassword = sessionStorage.getItem('isDefaultPassword') || true
		return Boolean(isDefaultPassword)
	}
}

const mutations = {
	SET_LOGGED_IN (state, arg) {
		state.loggedIn = arg
	},
	setIsDefaultPassword (state, isDefaultPassword) {
		sessionStorage.setItem('isDefaultPassword', isDefaultPassword)
	}
}

const actions = {
	setUserName (context, { username }) {
		try {
			sessionStorage.setItem('username', username)
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error saving user token', e)
			}
		}
	},
	removeUserName () {
		try {
			sessionStorage.removeItem('username')
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error removing user token', e)
			}
		}
	},
	setUserID (context, { id }) {
		try {
			sessionStorage.setItem('id', id)
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error saving user id', e)
			}
		}
	},
	removeUserID () {
		try {
			sessionStorage.removeItem('id')
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error removing user id', e)
			}
		}
	},
	setSid (context, { sid }) {
		try {
			sessionStorage.setItem('sid', sid)
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error saving session id', e)
			}
		}
	},
	removeSid () {
		try {
			sessionStorage.removeItem('sid')
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error removing session id', e)
			}
		}
	},
	setCsrftoken (context, { csrftoken }) {
		try {
			sessionStorage.setItem('csrftoken', csrftoken)
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error saving session id', e)
			}
		}
	},
	setLastPage (context, page) {
		try {
			sessionStorage.setItem('lastpage', page)
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error saving lastpage', e)
			}
		}
	},
	setLastSubPage (context, page) {
		try {
			sessionStorage.setItem('lastsubpage', page)
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error saving lastsubpage', e)
			}
		}
	},
	setLastTabPage (context, page) {
		try {
			sessionStorage.setItem('lasttabpage', page)
		}
		catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('error saving lasttabpage', e)
			}
		}
	},
	clearSession (context) {
		context.dispatch('removeUserID')
		context.dispatch('removeUserName')
		context.commit('SET_LOGGED_IN', false)
	}
}

export default {
	state,
	mutations,
	getters,
	actions
}
