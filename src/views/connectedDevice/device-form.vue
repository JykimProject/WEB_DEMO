<template>
	<section class="section">
		<ul class="devices-list">
			<li v-for="(row, idx) in tmpData" :key="idx" >
				<div class="devices-icon-wrap disabled">
					<span class="devices-model devices-watch">Wifi</span>
				</div>
				<div class="devices-info-wrap">
					<div class="devices-name" >{{row.ssid}}</div>
					<div class="devices-mac">{{row.bssid}}</div>
					<div class="devices-ip"></div>
					<div class="devices-online wifi" v-if="row.hwmode =='11a'"> 5G </div>
					<div class="devices-online wifi" v-if="row.hwmode !='11a'"> 2.4G </div>
					<div class="devices-channelbw">{{row.channel}} / {{row.bw}}</div>
					<div class="devices-btn-reflash"></div>
				</div> 
				
			</li>
		</ul>
		<div class="btn-area devices-btn-area">
			<button class="btn-devices-more">MORE</button>
		</div>
	</section>
</template>

<script>

export default {
	props: {
		columns: Array,
		data: Array,
		cnn: Array
	},
	data() {
		return {
			//props에서 받은 데이터를 아래와 같은 형태로 가공 필요.
			tmpData:[
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
			],
		}
	},
	mounted() {
	},
	computed: {
		getTableData() {
			// cnn is connectedDevice
			// if (this.cnn && this.cnn.length) this.data.push(this.cnn)
			return this.data
		}
	}
}
</script>
