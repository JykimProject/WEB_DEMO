/* eslint-disable no-dupe-keys */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { t } from '@/shared/functions'
import store from './store'
import Login from './views/Login.vue'
import Login_Telia from './views/Login_telia.vue'
import Base from './views/Base.vue'
import NotFound from './views/NotFound.vue'

Vue.use(VueRouter)

function getComponent (c) {
	if (process.env.NODE_ENV !== 'production' && c.substr(-4) !== '.vue') {
		throw new Error(`cannot load ${c}, you might have missed .vue extension`)
	}

	return () => import(
		/* webpackInclude: /index\.vue$/ */
		/* webpackChunkName: "[request]" */
		`./views/${c}`
	)
}

function checkmodel () {
	if (process.env.THEME == 'telia'){
		return () => import(
			`./views/Login_telia.vue`
		)
	}
	else {
		return () => import(
			`./views/Login.vue`
		)
	}
}

function allowSuperuserOnly (to, from, next) {
	const username = store.getters.user()[0]
	return next(
		username != null &&
		username === 'admin' ||
		username === 'root'
	)
}

export const baseChildren = [
	{
		redirect: '/home/status/:subpage',
		path: '/home',
		name: 'home',
		component:getComponent('home/index.vue'),
		children: [
			{
				path: '/home/status/:subpage',
				name: 'status',
				component: getComponent('base/status/index.vue'),
				title: () => t(store, 'status').cap,
			},
			{
				path: '/home/wifi/:subpage',
				name: 'wifi',
				component: getComponent('base/wireless/index.vue'),
				title: () => t(store, 'wireless').str,
			},
			{
				path: '/home/mesh/:subpage',
				name: 'mesh',
				component: getComponent('base/mesh/index.vue'),
				title: () => t(store, 'mesh').str,
			},
			{
				path: '/home/network/:subpage',
				name: 'network',
				component: getComponent('base/network/index.vue'),
				title: () => t(store, 'network').str,
			},
			{
				path: '/home/nat/:subpage',
				name: 'nat',
				component: getComponent('base/nat/index.vue'),
				title: () => t(store, 'nat').cap,
			},
			{
				path: '/home/advanced/:subpage',
				name: 'advanced',
				component: getComponent('base/advanced/index.vue'),
				title: () => t(store, 'advanced').cap,
			},
			{
				path: '/home/vpn/:subpage',
				name: 'vpn',
				component: getComponent('base/vpn/index.vue'),
				title: () => t(store, 'vpn').cap,
			},
			{
				path: '/home/security/:subpage',
				name: 'security',
				component: getComponent('base/security/index.vue'),
				title: () => t(store, 'security').cap,
			},
			{
				path: '/home/administration/:subpage',
				name: 'administration',
				component: getComponent('base/administration/index.vue'),
				title: () => t(store, 'administration').cap,
			},
			{
				path: '/home/qos',
				name: 'qos',
				component: getComponent('base/qos/index.vue'),
				title: () => t(store, 'qos').cap,
			},
		]
	},
/// #if buildOptions.__UNUSED
	{
		path: '/connectedDevice',
		name: 'connectedDevice',
		component: getComponent('connectedDevice/index.vue'),
		title: () => t(store, 'connectedDevice').cap,
	},
	{
		path: '/application',
		name: 'application',
		component: getComponent('application/index.vue'),
		title: () => t(store, 'application').cap,
	},
	{
		path: '/diagnostics',
		name: 'diagnostics',
		component: getComponent('base/diagnostics/index.vue'),
		title: () => t(store, 'diagnostics').cap,
	},
/// #endif
]

export const routes = [
	{
		path: '/',
		name: 'base',
		component: Base,
		children: baseChildren
	},
	{
		path: '/login',
		name: 'login',
		component: checkmodel()
		//component: Login
	},
	{
		path: '*',
		name: 'not-found',
		component: checkmodel()
		//component: Login
	}
]


let Router
Router = new VueRouter({routes: routes})

// initial page load
let init = true

Router.beforeEach((to, from, next) => {
	// redirect to login, if not logged in
	/*
	if (!init && to.name != 'login' && !store.state.user.loggedIn) {
		init = false
		// store.dispatch('removeUserToken')
		store.dispatch('removeUserName')
		next({replace: true, name: 'login'})
		return
	}
	*/
	/// #if buildOptions.quickInstallWizard
	const isDefaultPassword = sessionStorage.getItem('isDefaultPassword') !== 'false'
	if (isDefaultPassword && to.name !== 'administration' && to.name !== 'login') {
		next('administration')
		return
	}
	/// #endif

	if (to.path === '/') {
		next({replace: true, name: 'network', params: { subpage: 'lan' } })
		return
	}
	init = false

	next()
})

Router.afterEach(to => {
	// lastPage used for redirecting
	// after login
	if (to.name !== 'login' && to.name !== 'not-found' && to.path !== '/') {
		store.dispatch('setLastPage', to.path)
		store.dispatch('setLastSubPage', to.params.subpage)
	}
})

export default Router
