<template>
	<article class="article">
		<div class="wrap-content">
			<div class="container-fluid">
				<module-state></module-state>
				<section class="section">
					<b-button :style="'margin-left: .5rem; margin-bottom: .5rem;'" 
						variant="outline-secondary" 
						:pressed="activeListIndex === item ? true : false" 
						v-for="(item, index) in filteredList" 
						:key="index" 
						@click="activeListIndex = item"
					>
						{{ t(item).cap  }}
					</b-button>
				</section>

				<landhcp-page v-show="$buildOptions.networkLanPage" v-if="activeListIndex === 'lan'"></landhcp-page>
				<staticrouting-page v-show="$buildOptions.networkStaticroutingPage" v-if="activeListIndex === 'staticrouting'"></staticrouting-page>

			</div> <!-- /.container -->
		</div> <!-- /.wrap-content -->
	</article> <!-- /.article -->
</template>

<script>
import ws from '@/shared/lib/ws'
import { API } from '@/shared/constants'

import ModuleState from "../../module-state"
import LandhcpPage from "./landhcp/index"
import StaticroutingPage from "./staticrouting/index"

export default {
	components: {
		ModuleState,
		LandhcpPage,
		StaticroutingPage,
	},
	data() {
		return {
			list: [
				'lan',
				'staticrouting',
			],
			activeListIndex: 'lan',
			rtmode: '',
			authlv: ''
		}
	},
	beforeMount() {
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
					this.rtmode = feature.rtmode
					this.authlv = feature.authlv

					if(this.rtmode == 'bridge')
						this.activeListIndex = 'wanmode'
				}
			)
			return this.list.filter(item => {
				if (item == 'wanmode' && this.authlv != 'root') {
					return false
				}
				if (item != 'wanmode' && this.rtmode == 'bridge') {
					return false
				}
				if (item != 'lan' && this.authlv == 'user') {
					return false
				}
				return this.$buildOptions[`network${item.charAt(0).toUpperCase() + item.slice(1)}Page`]
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

