import ws from '@/shared/lib/ws'
import { RPC } from '@/shared/constants'
import { reportError } from '@/shared/functions'

const state = {
	langData: {},
	currentLang: 'en',
	availableLangs: [
		/// #if buildOptions.languageEn
		{label: 'English', value: 'en'},
		/// #endif
		/// #if buildOptions.languageDe
		{label: 'Deutsch', value: 'de'},
		/// #endif
		/// #if buildOptions.languageHu
		{label: 'Magyar', value: 'hu'}
		/// #endif
		// {label: 'Italiano', value: 'it'},
		// {label: 'Español', value: 'es'},
		// {label: 'Português', value: 'pt'},
		// {label: 'Hrvatski', value: 'hr'},
		// {label: 'Polish ', value: 'pl'},
	]
}

const mutations = {
	SET_LANG (state, lang) {
		state.currentLang = lang
	},
	SET_LANG_DATA (state, data) {
		state.langData = Object.freeze(data)
	}
}

const actions = {
	setLang ({ commit }, { lang }) {
		localStorage.setItem('language', lang)
		fetch(`/langs/${lang}.json`).then(response => {
			return response.json()
		}).then(json => {
			commit('SET_LANG', lang)
			commit('SET_LANG_DATA', json)

		}).catch(err => {
			reportError(err)
		})
	}
}

export default {
	state,
	mutations,
	actions
}
