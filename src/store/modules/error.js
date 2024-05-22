import Vue from 'vue'
import { defer } from '@/shared/functions'

const state = {
	groups: {
		/* sample structure
		'group-name': {
			'entity-name': [
				'error-2'
				{type: 'server', message: 'error-1'},
			]
		}
		*/
	}
}

const getters = {
	hasError: (state) => (group) => {
		if (typeof state.groups[group] !== 'object') {
			return Promise.resolve(false)
		}

		const promises = []

		for (const ent in state.groups[group]) {
			if (state.groups[group][ent].promise) {
				promises.push(state.groups[group][ent].promise)
			}
			else if (
				Array.isArray(state.groups[group][ent]) &&
				state.groups[group][ent].length > 0
			) {
				promises.push(Promise.resolve({valid: false}))
			}
		}

		if (promises.length) {
			return Promise.all(promises).then(p => {
				return p.some(({ valid }) => !valid)
			})
		}

		return Promise.resolve(false)
	},
	getErrors: (state) => (group, entity) => {
		if (typeof state.groups[group] !== 'object') {
			return []
		}
		if (!Array.isArray(state.groups[group][entity])) {
			return []
		}
		return state.groups[group][entity].filter(err => err.active)
	}
}

const mutations = {
	SET_ERROR_PENDING (state, { group, entity, promise }) {
		if (!state.groups[group]) {
			Vue.set(state.groups, group, {})
		}
		if (!Array.isArray(state.groups[group][entity])) {
			state.groups[group][entity] = []
		}
		state.groups[group][entity].promise = promise
	},
	SET_ERRORS (state, { group, entities, type, active = false }) {
		if (!state.groups[group]) {
			Vue.set(state.groups, group, {})
		}

		// turn entities into objects if they are not and
		// add 'type' and 'active' attributes to each, if given
		for (const ent in entities) {
			entities[ent].forEach((err, index) => {
				if (typeof err !== 'object') {
					entities[ent][index] = {message: err}
				}
				if (type) {
					entities[ent][index].type = type
				}
				entities[ent][index].active = active
			})
			// copy entity.promise, because it will be
			// lost in Object.assign() below
			entities[ent].promise = resolveEntity(group, ent, false)
		}

		state.groups[group] = Object.assign({}, state.groups[group], entities)
	},
	ACTIVATE_ERRORS (state, { group }) {
		if (typeof state.groups[group] !== 'object') {
			return
		}

		for (const ent in state.groups[group]) {
			state.groups[group][ent].forEach(err => err.active = true)
		}
	},
	UNSET_ERRORS (state, { group, ...filters }) {
		let entities = state.groups[group]

		if (!entities) {
			return
		}

		// if entity filter was given
		// and no other filters
		if (filters.entity && Object.keys(filters).length === 1) {
			resolveEntity(group, filters.entity, true)

			// ..then this entity should be deleted
			// without going further
			delete entities[filters.entity]
			return
		}

		for (const ent in entities) {
			// if entity filter was given and
			// this entity doesn't match it
			if (filters.entity && ent !== filters.entity) {
				// ...leave this entity in the store
				continue
			}

			// copy entity.promise, because it will be
			// lost in filter() below
			const promise = entities[ent].promise

			// filter errors
			entities[ent] = entities[ent].filter(err => {
				const errFiltersMatch = Object.keys(filters)
					// we don't need entity filter here
					.filter(key => key !== 'entity')
					.every(key => {
						return err[key] === filters[key]
					})

				// when filters don't match
				// we don't take this error
				// as candidate. It stays in
				// entity collection
				return !errFiltersMatch
			})

			// in case no errors left
			if (!entities[ent].length) {
				// ..resolve this entity
				entities[ent].promise = defer()
				entities[ent].promise.resolve({valid: true})
			}
			else {
				entities[ent].promise = promise
			}
		}

		// re-set group with filtered entities
		Vue.set(state.groups, group, entities)
	},
}

function resolveEntity(group, entity, valid) {
	if (state.groups[group][entity] && state.groups[group][entity].promise) {
		state.groups[group][entity].promise.resolve({valid})
		return state.groups[group][entity].promise
	}
}

export default {
	state,
	getters,
	mutations
}
