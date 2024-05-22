<template>
	<article class="article">
		<div class="wrap-content">
			<!-- class option : container / container-fluid / container-full -->
			<div class="container-fluid">
			    <module-state></module-state>
				<section class="section">
					<b-button 
						:style="'margin-left: .5rem; margin-bottom: .5rem;'" 
						variant="outline-secondary"
						:pressed="activeListIndex === item ? true : false" 
						v-for="(item, index) in filteredList" 
						:key="index"
						@click="activeListIndex = item"
					>
						{{ item=='advanced'? t('advanced-settings').cap : t(item).cap }}
					</b-button>
				</section>

				<ipsec-page v-show="$buildOptions.vpnIpsecPage" v-if="activeListIndex === 'ipsec'"></ipsec-page>

			</div> <!-- /.container -->
		</div> <!-- /.wrap-content -->
	</article> <!-- /.article -->
</template>

<script>
import ModuleState from "../../module-state"
import ws from '@/shared/lib/ws'
import { API } from '@/shared/constants'
import IpsecPage from "./ipsec/index"


export default {
	components: {
	    ModuleState,
		IpsecPage,
	},
	data() {
		return {
			list: [
				'ipsec',
			],
			activeListIndex: 'ipsec',
			authlv: '',
		}
	},
	beforeMount() {
		if (sessionStorage.getItem("authlv") != null) {
			this.authlv = sessionStorage.getItem("authlv")
		}

		let last_active_tab = this.$store.getters.lastSubPage()
		if (this.list.includes(last_active_tab)) {
			this.activeListIndex = this.$store.getters.lastSubPage()
		}
	},
	destroyed(){
		this.$store.dispatch('setLastSubPage', '')
	},
	computed: {
		filteredList() {
			Promise.all([
				ws.call(API.feature)
			]).then(
				([
					{ dict: feature }
				]) => {
					this.authlv = feature.authlv
					
					if (!this.list.includes(this.$store.getters.lastSubPage())) {					
						this.activeListIndex = 'status'
					}
				}
			)
			return this.list.filter(item => {
				return this.$buildOptions[`vpn${item.charAt(0).toUpperCase() + item.slice(1)}Page`]
			})
		}
	},
	watch: {
		activeListIndex(newValue) {
			if (this.filteredList.includes(newValue)) {
				this.$store.dispatch('setLastSubPage', newValue)
			}
		}
	},
}
</script>

