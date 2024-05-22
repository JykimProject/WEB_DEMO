<template>
	<transition appear :name='transition'>
		<div :name='name'>
			<div :class="{'id-group mt-5': name === 'username', 'pw-group mt-3': name === 'password' && icon === '', 'pw-group mt-3 type-view': name === 'password' && icon === 'type-view'}">
				<slot></slot>

				<div v-if='tooltip' class='tooltip--simple'>
					{{ tooltip }}
				</div>
			</div>

		</div>
		<div
			v-for='(err, i) in errors'
			:key='i'
			class='field__infotext field__infotext--warning'>
			{{ message(err) }}
		</div>
	</transition>
</template>

<script>
import VueTypes from 'vue-types'
import Translation from '@/shared/lib/i18n'
import { findComponentUpward } from 'iview/src/utils/assist'

export default {
	name: 'c-field',
	components: {},
	props: {
		// optional. If not given,
		// it searches for parent `<c-form>`
		// component and takes it's `name`
		form: VueTypes.string,

		// field name, used as ID for
		// various operations
		name: VueTypes.string.isRequired,
		label: VueTypes.string,
		tooltip: VueTypes.string,
		transition: VueTypes.string,
		id: VueTypes.string,
		title: VueTypes.string,

		// `value` used for validator
		value: VueTypes.any,
		validate: VueTypes.oneOfType([String, Array, Function]),
		validateMulti: VueTypes.oneOfType([String, Array, Function]),
		validateIf: VueTypes.oneOfType([Boolean, String, Array, Function]).def(true),
		validateMultiIf: VueTypes.oneOfType([Boolean, String, Array, Function]).def(true),

		icon: String
	},
	computed: {
		errors () {
			return this.$store.getters
				.getErrors(this.getFormName(), this.name)
				.filter(err => err.index == null)
		}
	},
	methods: {
		getFormName () {
			if (this.form) {
				return this.form
			}
			else {
				const form = findComponentUpward(this, 'c-form')
				if (form && form.name) {
					return form.name
				}
				else {
					console.error('missing form name for ' + this.name + ' field')
					return ''
				}
			}
		},
		message (err) {
			if (err.message instanceof Translation) {
				return err.message.str
			}
			return this.t('err.validation.' + err.message).str
		}
	},
}
</script>
