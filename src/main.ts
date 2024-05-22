import 'core-js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ws from '@/shared/lib/ws'
import { RPC } from '@/shared/constants'
import { t, reportError, Timer } from '@/shared/functions'
import vueBemCn from 'vue-bem-cn'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)
import 'normalize.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI);


//if(process.env.VENDOR==='p4'){
	require(`@/assets/scss/custom.scss`)
	require(`@/assets/scss/element-variables.scss`)
	// require(`bootstrap/dist/css/bootstrap.css`)
	// require(`bootstrap-vue/dist/bootstrap-vue.css`)

	require(`./css/${process.env.THEME}/app.css`)
//	require(`./css/play/app.css`)
//}
//else{
//	require(`bootstrap/dist/css/bootstrap.css`)
//	require(`bootstrap-vue/dist/bootstrap-vue.css`)
//	require(`element-ui/lib/theme-chalk/index.css`)

//	require(`./css/${process.env.THEME}/app.css`)
//}

import { locale, i18n, Spin } from 'iview'
import en from 'iview/dist/locale/en-US'

i18n(key => {
	const translation = t(store, key)

	// when translation exists
	if (translation.str !== key) {
		return translation.str
	}
})
locale(en)

Vue.use(vueBemCn)

Vue.config.productionTip = false

// eslint-disable-next-line no-undef
Vue.prototype.$buildOptions = BUILD_OPTIONS
Vue.prototype.$theme = process.env.THEME
Vue.prototype.$vendor = process.env.VENDOR
Vue.prototype.t = function (...args) {
	return t(store, ...args)
}
// confirmation dialog
Vue.prototype.$confirm = async (...args) => {
	const { default:confirmDialog } = await import(
		/* webpackChunkName: "confirm-dialog" */
		'./views/ConfirmDialog.vue'
	)
	const elem = document.createElement('div')
	const constructor = Vue.extend(confirmDialog)
	document.querySelector('body').appendChild(elem)
	const dialog = new constructor().$mount(elem)
	return dialog.open(...args)
}

const logout = () => {
	store.dispatch('clearSession')
	store.dispatch('setLastPage', '')
	store.dispatch('setLastSubPage', '')
	router.replace({name: 'network', params: { subpage: 'lan' }}).catch(() => {})
}


// TODO: ask if manifest of this feature needed, it works the same if we remove config option
// SET IDLE TIMER
/*
if (CONFIG.idleTimer) {
	let timer = new Timer(function() {
		ws.disconnect()
		logout()
	}, CONFIG.idleTimer)

	window.addEventListener('keyup', function(ev) {
		timer.reset(CONFIG.idleTimer)
	})

	window.addEventListener('mousemove', function(ev) {
		timer.reset(CONFIG.idleTimer)
	})

	window.addEventListener('click', function(ev) {
		timer.reset(CONFIG.idleTimer)
	})
}
*/

// set websocket callbacks
ws.init({
	onConnect () {
		store.commit('SET_LOGGED_IN', true)
		router.push(store.getters.lastPage() || '/home/status/dashboard').catch(() => {})

		Spin.hide()
	},
	onDisconnect (event) {
		if (this.tokenInterval) clearInterval(this.tokenInterval)
		ws.emptyQueue()

		if (!event.wasClean) {
			logout()
		}
	},
	onError () {
		Spin.hide()
	},
	onAuthError () {
		Spin.hide()

		if (router.currentRoute.name != 'login') {
			router.replace({name: 'login'})
			return
		}
	},
	onTimeout () {
		if (this.tokenInterval) clearInterval(this.tokenInterval)
		reportError({desc: t(store, 'conn-error-timeout').str})
		ws.emptyQueue()
		ws.disconnect()
		logout()
		setTimeout(() => location.reload(), 1500)
	},
})

// AUTOLOGIN
// eslint-disable-next-line no-undef
if (CONFIG.session) {
	const creds = store.getters.user()
	if (creds.length === 2) {
		ws.conn(sessionStorage.getItem('username'), sessionStorage.getItem('password'), creds[1])
			.then(() => {
				store.dispatch('setLang', {lang: getLang() , save: false})

				// mount UI
				new Vue({
					router,
					store,
					render: h => h(App),
					created () {
						// IE11 fix
						// https://github.com/vuejs/vue-router/issues/1849#issuecomment-427744124
						if (
							'-ms-scroll-limit' in document.documentElement.style &&
							'-ms-ime-align' in document.documentElement.style
						) {
							window.addEventListener("hashchange", () => {
								const currentPath = window.location.hash.slice(1)

								if (this.$route.path !== currentPath) {
									this.$router.push(currentPath)
								}
							}, false)
						}
					}
				}).$mount('#app')
			})
			.catch(err => {})
	} else if (router.currentRoute.name != 'login') {
		store.dispatch('setLang', {lang: getLang() , save: false})

		// mount UI
		new Vue({
			router,
			store,
			render: h => h(App),
			created () {
				// IE11 fix
				// https://github.com/vuejs/vue-router/issues/1849#issuecomment-427744124
				if (
					'-ms-scroll-limit' in document.documentElement.style &&
					'-ms-ime-align' in document.documentElement.style
				) {
					window.addEventListener("hashchange", () => {
						const currentPath = window.location.hash.slice(1)

						if (this.$route.path !== currentPath) {
							this.$router.push(currentPath)
						}
					}, false)
				}
			}
		}).$mount('#app')
	}
} else {
	store.dispatch('setLang', {lang: getLang() , save: false})

	// mount UI
	new Vue({
		router,
		store,
		render: h => h(App),
		created () {
			// IE11 fix
			// https://github.com/vuejs/vue-router/issues/1849#issuecomment-427744124
			if (
				'-ms-scroll-limit' in document.documentElement.style &&
				'-ms-ime-align' in document.documentElement.style
			) {
				window.addEventListener("hashchange", () => {
					const currentPath = window.location.hash.slice(1)

					if (this.$route.path !== currentPath) {
						this.$router.push(currentPath)
					}
				}, false)
			}
		}
	}).$mount('#app')
}

// based on https://stackoverflow.com/a/26889118/1644017
//function getLang(fallback = localStorage.getItem('language') ? localStorage.getItem('language') : process.env.VENDOR === 'magyar' ? 'hu' : (process.env.VENDOR == 'vectra'||'p4' ? 'pl' : 'en')) {
function getLang(fallback = localStorage.getItem('language') ? localStorage.getItem('language') : 'en') {
	let lang = window.navigator.languages ? window.navigator.languages[0] : null
	lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage

	let shortLang = lang

	if (shortLang.indexOf('-') !== -1) {
		shortLang = shortLang.split('-')[0]
	}
	if (shortLang.indexOf('_') !== -1) {
		shortLang = shortLang.split('_')[0]
	}

	const availableLangs = store.state.i18n.availableLangs.map(l => l.value)

	if (!availableLangs.includes(shortLang)) {
		return fallback
	}
	return shortLang
}
