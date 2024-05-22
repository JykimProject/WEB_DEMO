<template>
	<form class='form-box' v-on='$listeners'>
		<div class="login-logo" v-if="title === 'login'"></div>
		<spin v-if='loading' fix></spin>

		<slot></slot>
		<div v-if='actions' :class='["u-type--right u-type-sml--center u-spc-top--sml", {"u-grid-sml__col12": cssGrid}]'>
			<button type='button' @click='reset' class='btn btn--ghost btn--med'>{{ t('cancel').cap }}</button>
			<button type='submit' class='btn btn--primary btn--med u-rounded'>{{ t('save').cap }}</button>
		</div>
	</form>
</template>

<script>
import VueTypes from 'vue-types'
import { Spin } from 'iview' 

export default {
	name: 'c-form',
	components: {Spin},
	props: {
		loading: VueTypes.bool.def(false),

		// some child components may
		// access this, e.g. `<c-field>`
		name: VueTypes.string.isRequired,

		// adds save/cancel buttons at
		// the bottom of form
		actions: VueTypes.bool.def(true),

		title: VueTypes.string
	},
	data () {
		return {
			cssGrid: false
		}
	},
	mounted () {
		this.cssGrid = this.$el && this.$el.classList.contains('u-grid')
	},
	methods: {
		reset () {
			/// #if buildOptions.formCancelNavigateBack
			const prevRoute = this.$route.path

			this.$router.go(-1)

			setTimeout(() => {
				if (this.$route.path === prevRoute) {
					this.$router.push({name: '/'})
				}
			}, 200)
			/// #else
			window.location.reload()
			/// #endif
		}
	}
}
</script>
