<template>
	<article class="article">
		<div class="wrap-content">
			<!-- class option : container / container-fluid / container-full -->
			<div class="container-fluid">
				<module-state></module-state>
				<section class="section">
					<ul class="radio-list">
						<!-- class option : none / active -->
						<li v-for="tab in tabs" :class="{ 'active': currentTab === tab.id }" @click="currentTab = tab.id" :key="tab.id">
							<div class="radio-label">{{ tab.label }}</div>
						</li>
					</ul>
				</section>
				<device-form v-if="currentTab === 'Devices'"
				:columns='table.columns'
				:tData='table.data'
				:cnn='globalModeValues'></device-form>
				<topology-form v-if="currentTab === 'Topology'"
				:columns='table.columns'
				:tData='table.data'></topology-form>
			</div> <!-- /.container -->
		</div> <!-- /.wrap-content -->
	</article> <!-- /.article -->
</template>

<script>
import ModuleState from "../module-state"
import DeviceForm from "./device-form.vue"
import TopologyForm from "./topology-form.vue"
import ws from '@/shared/lib/ws'
import { API } from '@/shared/constants'
import { MACFILTER, UciWifiIface } from '@/shared/lib/uci/wireless';
import { getConnectedDevices, reportError } from '@/shared/functions'

export default {
	components: {
		ModuleState,
		DeviceForm,
		TopologyForm
	},
	data() {
		return {
			currentTab: "Devices",
			tabs: [
				{ id: "Devices", label: this.t("Devices") },
				{ id: "Topology", label: this.t("Topology") },
			],
			table: {
				columns: [
					this.t('bssid').str,
					this.t('ssid').str,
					this.t('map_flags').str,
					this.t('hwmode').str,
					this.t('channel').str,
					this.t('bw').str,
					this.t('clients').str,
				],
				data: [
					{bssid:"74:3a:ef:28:43:7f",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11g",channel:11,bw:20,repeater:1,clients:[]},
					{bssid:"5a:3a:ef:28:43:7c",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11g",channel:11,bw:20,repeater:1,clients:[]},
					{bssid:"62:3a:ef:28:43:81",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11a",channel:108,bw:80,repeater:1,clients:[
						{client:"4e:64:93:45:2c:2f",signal_strength:-43},
						{client:"2a:31:36:74:31:20",signal_strength:-36}]},
					{bssid:"62:3a:ef:28:43:82",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11a",channel:108,bw:80,repeater:1,clients:[]},
					{bssid:"18:34:af:06:a0:7c",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11g",channel:11,bw:20,repeater:1,clients:[]},
					{bssid:"42:34:af:06:a0:7d",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11g",channel:11,bw:20,clients:[]},
					{bssid:"18:34:af:06:a0:7a",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",channel:85,bw:160,router:1,clients:[]},
					{bssid:"18:34:af:06:a0:7b",ssid:"__backHaul06a0db__",map_flags:"backhaul",channel:85,bw:160,router:1,clients:[
						{client:"c8:58:c0:2a:75:8d",signal_strength:-45,phy_rate:"1134 Mbps"},
						{client:"8c:55:4a:59:17:26",signal_strength:-34,phy_rate:"1134 Mbps"}]},
					{bssid:"18:34:af:06:a0:7b",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11a",channel:108,bw:80,router:1,clients:[]},
					{bssid:"3a:34:af:06:a0:7c",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11a",channel:108,bw:80,router:1,clients:[
						{client:"74:3a:ef:28:43:80",signal_strength:-19,agent_bh:"76:3a:ef:28:43:7f"}]}
				]
			},
			modeOptions: [
				// cSelect is not supporting `null` as a value, for 'deactivate'
				{ label: this.t('deactivate').cap, value: MACFILTER.DISABLE },
				{ label: this.t('whitelist').cap, value: MACFILTER.ALLOW },
				{ label: this.t('blacklist').cap, value: MACFILTER.DENY },
			],
			PT_OWRT_UBUS_RESULT: {
			status:"ok",
			result:[
				{
					repeater:1,
					agent_profile:"v2",
					connected_to:"1a:34:af:06:a0:dc",
					throughput_to_parent:"1701 Mbps",
					connection_to_parent:"wireless",
						related_macs:["5a:3a:ef:28:43:7c","74:3a:ef:28:43:7f","62:3a:ef:28:43:81","62:3a:ef:28:43:82","74:3a:ef:28:43:80","74:3a:ef:28:43:7e"],
						wired_clients:["18:67:b0:d1:fd:80"],
					bssids:[
						{bssid:"74:3a:ef:28:43:7f",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11g",channel:11,bw:20,clients:[]},
						{bssid:"5a:3a:ef:28:43:7c",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11g",channel:11,bw:20,clients:[]},
						{bssid:"62:3a:ef:28:43:81",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11a",channel:108,bw:80,clients:[
							{client:"4e:64:93:45:2c:2f",signal_strength:-43},
							{client:"2a:31:36:74:31:20",signal_strength:-36}]},
						{bssid:"62:3a:ef:28:43:82",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11a",channel:108,bw:80,clients:[]}]
				},
				{
					repeater:0, //repeater 가 0이면 Router
					agent_profile:"v2",
					related_macs:["42:34:af:06:a0:7d","18:34:af:06:a0:7c","18:34:af:06:a0:7a","3a:34:af:06:a0:7c","18:34:af:06:a0:7b"],
					wired_clients:["a0:ce:c8:cb:7a:d2"],
					bssids:[
						{bssid:"18:34:af:06:a0:7c",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11g",channel:11,bw:20,clients:[]},
						{bssid:"42:34:af:06:a0:7d",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11g",channel:11,bw:20,clients:[]},
						{bssid:"18:34:af:06:a0:7a",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",channel:85,bw:160,clients:[]},
						{bssid:"18:34:af:06:a0:7b",ssid:"__backHaul06a0db__",map_flags:"backhaul",channel:85,bw:160,clients:[
							{client:"c8:58:c0:2a:75:8d",signal_strength:-45,phy_rate:"1134 Mbps"},
							{client:"8c:55:4a:59:17:26",signal_strength:-34,phy_rate:"1134 Mbps"}]},
						{bssid:"18:34:af:06:a0:7b",ssid:"KaonAP-06A0DB",map_flags:"fronthaul",hwmode:"11a",channel:108,bw:80,clients:[]},
						{bssid:"3a:34:af:06:a0:7c",ssid:"__backHaul06a0db__",map_flags:"backhaul",hwmode:"11a",channel:108,bw:80,clients:[
							{client:"74:3a:ef:28:43:80",signal_strength:-19,agent_bh:"76:3a:ef:28:43:7f"}]}]
				}
			]
		},
		}
	},
	mounted() {
		this.$nextTick(() => {
			document.body.className = 'full-page';
		})
		this.fetchData()
	},
	methods: {
		load () {
			this.$store.dispatch('wireless/loadIfaces')
			this.$store.dispatch('wireless/loadDevices')
		},
		fetchData () {
			this.table.data = []
			let repeaterNum = 0
			ws.call(API.topology.get).then(({ dict }) => {
				// prepare for drawGraph
				this.meshAgents = JSON.parse(JSON.stringify(dict.result))
				// router is ap mac
				const router = Object.keys(this.meshAgents).find(item => this.meshAgents[item].repeater === '0')
				return getConnectedDevices().then(connectedDevices => {
					this.connectedDevices = connectedDevices
					// this.drawGraph([router])

					Object.keys(dict.result).sort((x, y) => {
						if (dict.result[x].repeater === "0" && dict.result[y].repeater === "1") {
							return -1
						}
					}).forEach(key => {
						dict.result[key].bssids.forEach((item, i) => {
							const label = dict.result[key].repeater === '1' ? `${this.t('repeater').cap}${repeaterNum}` : this.t('router').cap
							this.table.data.push([
								!i ? label : '\xa0',
								item.ssid,
								item.bssid,
								item.hwmode === '11a' ? '5G' : '6g' ? '6G': '2.4G',
								`${item.channel}/${item.bw}`,
								item.map_flags || 'n/a',
								'n/a'
							])
						})
						repeaterNum = dict.result[key].repeater === '0' ? repeaterNum : repeaterNum + 1
						this.load()
					})
				})
			}).catch(reportError).finally(() => {
				this.done = true
			})
		},
		// dataSet (dataResult) {
		// 	const conDevice = this.PT_OWRT_UBUS_RESULT.result;
		// 	for (var i = 0; i < conDevice.length; i ++) {
		// 		if (!conDevice.repeater) {
		// 			this.table.data.push({label:"Router"})
		// 		}
		// 	}
		// }
	},
	computed: {
		loading() {
			return this.$store.getters['wireless/getDevicesLoading']
				|| this.$store.getters['wireless/getIfacesLoading']
		},
		ifaceSections() {
			return this.$store.getters['wireless/getIfaces']
		},
		ifaceSectionNames() {
			return this.ifaceSections.reduce((acc, section) => {
				if (!section.ssid) {
					return acc
				}

				if (acc[section.ssid]) {
					acc[section.ssid].push(section['.name'])
				} else {
					acc[section.ssid] = [section['.name']]
				}
				return acc
			}, {})
		},
		globalModeValues() {
			return Object.keys(this.ifaceSectionNames).map((ssid) => {
				const section = this.ifaceSections.find(iface => iface.ssid == ssid)
				const actualMode = section && section.macfilter || MACFILTER.DISABLE
				const modeString = this.modeOptions.find(o => o.value === actualMode)
				return {
					ssid,
					mode: modeString && modeString.label
				}
			})
		},
	}
}
</script>
