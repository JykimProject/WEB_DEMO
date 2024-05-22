import Vue from 'vue'
import get from 'lodash/get'
import set from 'lodash/set'

const state = {
	forms: {
		/*
		'formName': {
			$dirty: true,
			'fieldsetName': [
				{$name: 'field1', value: 'test'},
				{$name: 'field2', value: 'test', anyKey: 'val'},
			]
		}
		*/
	},
}

const getters = {
	fields: state => (formName, fieldsetName = 'default') => {
		if (!state.forms[formName] || !state.forms[formName][fieldsetName]) {
			return []
		}
		return state.forms[formName][fieldsetName]
	},
	fieldsValues: (state, getters) => (formName, fieldsetName = 'default', prop = 'value') => {
		const obj = {}

		getters.fields(formName, fieldsetName).forEach(field => {
			obj[field.$name] = field[prop]
		})
		return obj
	},
	nonEmptyFieldsValues: (state, getters) => (formName, fieldsetName = 'default', prop = 'value') => {
		const obj = {}

		getters.fields(formName, fieldsetName).forEach(field => {
			if (typeof field[prop] === 'string' || Array.isArray(field[prop])) {
				if (field[prop].length > 0) {
					obj[field.$name] = field[prop]
				}
			}
			else {
				obj[field.$name] = field[prop]
			}
		})
		return obj
	},
	emptyFields: (state, getters) => (formName, fieldsetName = 'default', prop = 'value') => {
		return getters.fields(formName, fieldsetName)
			.filter(field => field[prop].length === 0)
			.map(field => field.$name)
	}
}

const mutations = {
	SET_FORM_DIRTY ({ forms }, formName) {
		forms[formName].$dirty = true
	},
	SET_FORM_CLEAN ({ forms }, formName) {
		forms[formName].$dirty = false
	},

	STAGE_FORM_FIELD (state, { formName, fieldsetName, fieldName, data }) {
		const fieldset = getFieldset(true, formName, fieldsetName)
		const fieldIndex = getFieldIndex(true, fieldset, fieldName)

		Vue.set(
			fieldset,
			fieldIndex,
			Object.assign({}, fieldset[fieldIndex], data)
		)
	},
	UNSTAGE_FORM_FIELD (state, { formName, fieldsetName, fieldName }) {
		const fieldset = getFieldset(false, formName, fieldsetName)

		if (fieldset) {
			const fieldIndex = getFieldIndex(false, fieldset, fieldName)

			if (fieldIndex) {
				Vue.delete(fieldset, fieldIndex)
			}
		}
	},

	UNSTAGE_FORM ({ forms }, { formName, fieldsetName }) {
		if (fieldsetName) {
			Vue.delete(forms[formName], fieldsetName)
		}
		else {
			Vue.delete(forms, formName)
		}
	}
}

const getFieldset = (create, formName, fieldsetName) => {
	let fieldset = get(state.forms, [formName, fieldsetName])

	if (!fieldset && create) {
		set(state.forms, [formName, fieldsetName], [])
		fieldset = state.forms[formName][fieldsetName]
	}
	return fieldset
}

const getFieldIndex = (create, fieldset, fieldName) => {
	let index = fieldset.findIndex(field => {
		return field.$name === fieldName
	})

	if (index === -1 && create) {
		const length = fieldset.push({$name: fieldName})
		index = length - 1
	}
	return index
}

export default {
	state,
	getters,
	mutations,
}
