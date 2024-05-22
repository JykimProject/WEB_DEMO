<template>
	<div @click="logout()">
		<span class="el-dropdown-link">
			{{ t('log-out') }}
		</span>
	</div>
</template>
<script>
import vClickOutside from 'v-click-outside'
import ws from '@/shared/lib/ws'

export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	data () {
		return {
			showAdmin: false,
			userId: ''
		}
	},
	methods: {
		logout () {
			ws.disconnect()
			this.$store.dispatch('clearSession')
			this.$store.dispatch('setLastPage', '')
			this.$router.replace({name: 'network', params: { subpage: 'lan' }}).catch(() => {})
			this.showAdmin = false;
		},
		showLogout() {
			if (this.showHeader) {
				this.showAdmin = true
				this.userId = this.showAdmin ? this.$store.getters.user()[0] : ''
			}
		}
	},
	computed: {
		showHeader () {
			if (!this.$route.matched.length || this.$route.matched[0].name === 'rader') {
				return false
			}
			return this.$route.matched[0].name === 'base'
		}
	}
}
</script>