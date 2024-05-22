<template>
	<section class="section">
		<!-- topology -->
		<div class="topology-wrap">
			<div class="topology-area" v-loading="loading">
				<div class="container-legend">
					<ul class="legend-list">
						<li>Slave</li>
						<li>Master</li>
						<li>Wired</li>
						<li>2.4Ghz</li>
						<li>5Ghz</li>
						<li>6Ghz</li>
						<li>Disconnect</li>
						<li>Signal Good</li>
						<li>Signal Warning</li>
						<li>Signal Bad</li>
					</ul>
				</div>
				<network id="mynetwork" class="network" ref="network" style="width:100%;height:100%; overflow:hidden;"
					:nodes="topologyArr"
					:edges="connectedLineInfo"
					:options="connectedOptions"
					>
				</network>
			</div>
		</div>
	</section>
</template>

<script>
import { Network, DataSet } from 'vue-vis-network';
import ws from '@/shared/lib/ws'
import { RPC, API } from '@/shared/constants'
import { getConnectedDevices, reportError, CheckWriteLevel } from '@/shared/functions'
import { MessageBox } from 'element-ui';
export default {
	// props: {
	// 	columns: Array,
	// 	data: Array
	// },
	mounted() {
		this.loading=true
		this.fetchData()
	},
	components: {
		Network
	},
	data() {
		return {
			nodes: [],
			edges: [],
			options: {},
			maclist: [],
			meshAgents: {},
			dhcpLease: [],
			repeaterNum: 0,
			connIdx: 0,
			topologyArr: [],
			connectedLineInfo: [],
			connectedOptions: {},
			loading: false,
			alert: true
		}
	},
	methods: {
		open() {
			MessageBox.confirm(this.t('easymesh_alert'),  this.t('info').cap, {
				confirmButtonText: this.t('ok'),
				cancelButtonText: this.t('cancel'),
				type: 'info',
				center: false,
				roundButton: true
			}).then(() => {
				// ok button
				this.$router.replace({name: 'wifi', params: {direct : 'easymesh'}} )
				this.$message({
					type: 'info',
					message: this.t('easymesh-user-action'),
					duration: 7777,
					showClose: true
				});
			})
			.catch(() => {
				// cancel button
				this.loading=false
			});
		},
		fetchData(){
			Promise.all([
				ws.call(API.status.dhcp),
				ws.call(API.topology.reload),
				//ws.call(RPC.wireless.bcmwifi.easyMesh),
				ws.call(API.topology.get)
			]).then(([
				{dict:client},
				{dict:reload},
				//{dict:easymesh_status},
				{dict:easymesh_agents}
			]) => {
				if(reload.code !='0'&&this.alert==true){
					this.open()
				} 
				else if (easymesh_agents.code != '0' && this.alert == true){
					this.open()
				}
				else{
					client.dhcp.split("\n").forEach(client => {
						let ar = client.split(" ")
						let device ={
							time: ar[0],
							mac: ar[1],
							ip: ar[2],
							hostname: ar[3]
						}
						this.dhcpLease.push(device)
					})
					this.meshAgents = JSON.parse(JSON.stringify(easymesh_agents))
					const router = Object.keys(this.meshAgents).find(item => this.meshAgents[item].repeater === '0')
					this.connIdx = 0
					this.connectedOptions = this.setupOptions()
					this.drawGraph([router], 0)
					this.updateTooltip()
				}
			}).catch(err => reportError(err))
				.finally(()=> {
					this.alert=false,
					this.loading=false })
		},
		searchClientIcon(device, dBm) {
			let iconFileName = '';
			switch(device) {
				case 'ar1344':
					iconFileName = '../img/icon-slave-ar1344-';
					break;
				case 'ar1840':
					iconFileName = '../img/icon-slave-ar1840-';
					break;
				case 'smart watch':
					iconFileName = '../img/icon-topology-smartwatch-';
					break;
				case 'smart tv':
					iconFileName = '../img/icon-topology-tv-';
					break;
				case 'ai speaker':
					iconFileName = '../img/icon-topology-aispeaker-';
					break;
				case 'imac pro':
					iconFileName = '../img/icon-topology-desktop-';
					break;
				case 'x-box':
					iconFileName = '../img/icon-topology-gamebox-';
					break;
				case 'mobile':
					iconFileName = '../img/icon-topology-mobile-';
					break;
				case 'dongle':
					iconFileName = '../img/icon-topology-dongle-';
					break;
				case 'audio':
					iconFileName = '../img/icon-topology-speaker-';
					break;
				case 'tablet':
					iconFileName = '../img/icon-topology-tablet-';
					break;
				case 'cctv':
					iconFileName = '../img/icon-topology-cctv-';
					break;
				case 'print':
					iconFileName = '../img/icon-topology-print-';
					break;
				case 'smartlight':
					iconFileName = '../img/icon-topology-smartlight-';
					break;
			}

			// TDOD: 신호세기(dBm) 값, 신호세기 수준 판별 기준 확인 및 적용 필요
			// 03: Good / 04: Warning / 05: Bad
			if(dBm > -80) {
				iconFileName += '03.png'
			} else if(dBm > -90) {
				iconFileName += '04.png'
			} else if(dBm <= -90) {
				iconFileName += '05.png'
			} else {
				iconFileName += '03.png'
			}
			// console.log("iconFileName", iconFileName)
			return iconFileName;
		},
		setLineFeature(frqType) {
			let lineFeature = '';
			//TODO: 유,무선, DISCONNECTED 구분자 확인 후 수정 필요
			switch(frqType) {
				case '5':
					lineFeature = '#43abe0';
					break;
				case '6':
					lineFeature = '#9e48e7';
					break;
				case 'wired':
					lineFeature = '#8f8f8f';
					break;
				case 'disconneted':
					lineFeature = '#4c5373';
					break;
				case '2.4':
				default:
					lineFeature = '#69dfac';
					break;
			}

			return lineFeature;
		},
		setupOptions(){
 			return {
				edges	: {
					font: { size: 10
						//, color : 'grey'
					}
					,smooth: false
					//,dashes: true 
				},
				physics: {
        				barnesHut: {
	            				gravitationalConstant: -2000,
        	    				centralGravity: 0
        				},
	        			minVelocity: 1
    				},
				
				nodes:{
					font: {
						color: '#ffffff',
					},
				},

				autoResize: true,
  				height: '100%',
  				width: '100%',

				layout: {
					randomSeed: 10,
					improvedLayout:true,
					clusterThreshold: 150,
					hierarchical: {
						enabled:false,
						levelSeparation: 150,
						nodeSpacing: 100,
						treeSpacing: 200,
						blockShifting: true,
						edgeMinimization: true,
						parentCentralization: true,
						direction: 'UD',        // UD, DU, LR, RL
						sortMethod: 'hubsize',  // hubsize, directed
					},
				},
			}
		},
		createHTMLTitle(html) {
			var element = document.createElement("div");
			element.innerHTML = html;
			return element;
		},
		setBandFequency(hwmode){
			let band_freq = "0" 
			if ( hwmode ){
				if  (hwmode == "11a")
					band_freq = "5" 
				else if( hwmode == "11g")
					band_freq = "2.4"
				else
					band_freq = "6"
			}
			return band_freq
		},
		updateTooltip() {
			for(var i = 0; i <  this.topologyArr.length; i ++){
				if(this.topologyArr[i].info) {
					const info = this.topologyArr[i].info
					if(info.type == 'router' ){
						// tooltip: router 
						this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>Main Controller</span><span></div>
							    <div><span>Serial Number   </span><span>` + this.topologyArr[i].info.serial+ `</span></div>
							    <div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
								<div><span>MAC Address     </span><span>` + this.topologyArr[i].info.mac+ `</span></div>`)
						continue
					}
					if(info.line == 'wired'){
						// tooltip: lan device
						if (info.type == 'repeater')
						{
							this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>Serial Number   </span><span>` + this.topologyArr[i].info.serial+ `</span></div>	 
								<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
								<div><span>MAC Address     </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
								<div>Connected      Lan </div>`)
						}
						else
						{
							this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>HostName      </span><span>` + info.hostname + `</span></div>
								<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
								<div><span>MAC Address     </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
								<div>Connected      Lan </div>`)
						}
					}else {
						// tooltip: wifi device
						if (info.type == 'repeater')
						{
							let bssid = this.topologyArr[i].info.bssid
							if (bssid && bssid.hwmode == "11g"){
								this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><div><span>Serial Number   </span><span>` + this.topologyArr[i].info.serial+ `</span></div>
									<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
									<div><span>MAC Address      </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
									<div><span>2.4Ghzs Channel      </span><span>` + bssid.channel+ `</span></div>
									<div><span>Signal Strength      </span><span>` + this.topologyArr[i].info.strength+ `</span></div>`)
							} else if (bssid && bssid.hwmode == "11a"){
								this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>Serial Number   </span><span>` + this.topologyArr[i].info.serial+ `</span></div>
									<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
									<div><span>MAC Address      </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
									<div><span>5Ghz Channel      </span><span>` + bssid.channel+ `</span></div>
									<div><span>Signal Strength      </span><span>` + this.topologyArr[i].info.strength+ `</span></div>`)
							} else if (bssid &&  bssid.hwmode == "6g"){
								this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>Serial Number   </span><span>` + this.topologyArr[i].info.serial+ `</span></div>
									<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
									<div><span>MAC Address      </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
									<div><span>6Ghz Channel      </span><span>` + bssid.channel+ `</span></div>
									<div><span>Signal Strength      </span><span>` + this.topologyArr[i].info.strength+ `</span></div>`)
							}
						}
						else
						{
							let bssid = this.topologyArr[i].info.bssid
							if (bssid && bssid.hwmode == "11g"){
								this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>HostName      </span><span>` + info.hostname + `</span></div>
									<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
									<div><span>MAC Address      </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
									<div><span>2.4Ghzs Channel      </span><span>` + bssid.channel+ `</span></div>
									<div><span>Signal Strength      </span><span>` + this.topologyArr[i].info.strength+ `</span></div>`)
							} else if (bssid && bssid.hwmode == "11a"){
								this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>HostName      </span><span>` + info.hostname + `</span></div>
									<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
									<div><span>MAC Address      </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
									<div><span>5Ghz Channel      </span><span>` + bssid.channel+ `</span></div>
									<div><span>Signal Strength      </span><span>` + this.topologyArr[i].info.strength+ `</span></div>`)
							} else if (bssid &&  bssid.hwmode == "6g"){
								this.topologyArr[i]["title"] = this.createHTMLTitle(`<div><span>HostName      </span><span>` + info.hostname + `</span></div>
									<div><span>IP Address      </span><span>` + this.topologyArr[i].info.ip+ `</span></div>
									<div><span>MAC Address      </span><span>` + this.topologyArr[i].info.mac+ `</span></div>
									<div><span>6Ghz Channel      </span><span>` + bssid.channel+ `</span></div>
									<div><span>Signal Strength      </span><span>` + this.topologyArr[i].info.strength+ `</span></div>`)
							}
						}
					}	
				}
			}
		},
		createRouterDevice(mac){
			let modelIconStr = "AR2148"
			const body = document.querySelector('body');
			const img = new Image()
			img.src = '../img/icon-master-ar2148-01.png'
			// body.appendChild(img); 
			//console.log(mac)
			let deviceInfo = {
				id: ++this.connIdx
				// ,label: `${mac}-${this.connIdx}`
				,label: this.meshAgents[mac].friendlyname
				,shape: 'image'
				, image: img.src
				, info: {
					ip: this.meshAgents[mac].ipaddr
					, type: 'router'
					, line: 'wired'
					, mac: this.meshAgents[mac].mac
					, serial: this.meshAgents[mac].serial
				}
				, font: {
					background: '#0f7ae6'
				}
				, size: 55
			};
			this.topologyArr.push(deviceInfo);
			this.maclist.push(mac)
		},
		createWifiDevice(client, bssid, masterIdx){
			if (client.agent_bh) {
				// client.agent_bh, i.e = repeater
				const clientnode = this.dhcpLease.find(item => item.mac === client.agent_bh)
				let subclientModel = "ar1344"
				let subclientInfo = {
					id: ++this.connIdx
					// , label: `${client.agent_bh}-${this.connIdx}`
					//, label: `${this.t('repeater').cap}${this.repeaterNum}`
					, label: this.meshAgents[client.agent_bh].friendlyname
					, shape: 'image'
					, image: this.searchClientIcon(subclientModel, client.signal_strength)
					, info:{
						ip: this.meshAgents[client.agent_bh].ipaddr
						, type: 'repeater'
						, line: 'wifi'
						, hostname: clientnode ? clientnode.hostname : ''
						, mac: this.meshAgents[client.agent_bh].mac
						, bssid
						, strength: client.signal_strength
						, serial: this.meshAgents[client.agent_bh].serial
					}
					, font: {
						background: '#0f7ae6'
					}
				};
				this.topologyArr.push(subclientInfo);
				this.maclist.push(client.agent_bh)
				this.repeaterNum++
				// set LINE INFO.
				let lineInfo = {
					from: masterIdx
					, to: this.connIdx
					, smooth: {
						type: 'cubicBezier'
					}
					, label: bssid.channel
					, width: 2
					, color: this.setLineFeature(this.setBandFequency(bssid.hwmode))	// 연결 타입 확인 후 적용 필요
					, length: 300
					, dashes: bssid.hwmode == "11g" ? true : false
					, font :{
						//color :'#9e48e7'
						//, size : 20
						//, background: '#000000'
						//, strokeWidth : 0
						//, strokeColor: '#9e48e7'
					}
				}
				this.connectedLineInfo.push(lineInfo);
				// let newmasterIdx = this.connIdx
				// console.log("wireless-repeater", client.agent_bh, lineInfo.from, lineInfo.to)
				const connectedTo = Object.keys(this.meshAgents).filter(item => (item == client.agent_bh) )
				if(connectedTo){
					// console.log("wireless-repeater goto: ", connectedTo, this.connIdx)
					this.drawGraph([connectedTo], this.connIdx)
				}
			}else {
				// !client.agent_bh, i.e = wifi client
				const clientnode = this.dhcpLease.find(item => item.mac === client.client)
				const label = clientnode ? (clientnode.hostname != "*"? clientnode.hostname: client.client): client.client
				let subclientModel = "imac pro"
				let subclientInfo = {
					id: ++this.connIdx
					// , label: `${client.client}-${this.connIdx}`
					, type: 'client'
					, line: 'wifi'
					, label: `${label}`
					, shape: 'image'
					, image: this.searchClientIcon(subclientModel, client.signal_strength)
					, info:{
						ip: clientnode ? clientnode.ip : ''
						, hostname: clientnode ? clientnode.hostname : ''
						, mac: client.client
						, bssid
						, strength: client.signal_strength
					}
				};
				this.topologyArr.push(subclientInfo);
				this.maclist.push(client.client)
				// set LINE INFO.
				let lineInfo = {
					from: masterIdx
					, to: this.connIdx
					, smooth: {
						type: 'cubicBezier'
					}
					, label: bssid.channel
					, width: 2
					, color: this.setLineFeature(this.setBandFequency(bssid.hwmode))	// 연결 타입 확인 후 적용 필요
					, length: 150
					, dashes: bssid.hwmode == "11g" ? true : false 
				}
				this.connectedLineInfo.push(lineInfo);
				// console.log("wireless-client", client.client, lineInfo.from, lineInfo.to, this.setBandFequency(bssid.hwmode))
			}
		},
		createLanDevice(client, masterIdx){
			if (this.meshAgents[client]) {
				// client.agent_bh, i.e = repeater
				const clientnode = this.dhcpLease.find(item => item.mac === client)
				let subclientModel = "ar1344"
				let subclientInfo = {
					id: ++this.connIdx
					, label: this.meshAgents[client].friendlyname
					, shape: 'image'
					, image: this.searchClientIcon(subclientModel, client)
					, info:{
						ip: this.meshAgents[client].ipaddr
						, type: 'repeater'
						, line: 'wired'
						, hostname: clientnode ? clientnode.hostname : ''
						, mac: this.meshAgents[client].mac
						, strength: 'wired'
						, serial: this.meshAgents[client].serial
					}
					, font: {
						background: '#0f7ae6'
					}
				};
				this.topologyArr.push(subclientInfo);
				this.maclist.push(client)
				this.repeaterNum++
				// set LINE INFO.
				let lineInfo = {
					from: masterIdx
					, to: this.connIdx
					, smooth: {
						type: 'cubicBezier'
					}
					, label: ''
					, width: 3
					, color: this.setLineFeature('wired')	// 연결 타입 확인 후 적용 필요
					, length: 150
				}
				this.connectedLineInfo.push(lineInfo);
				const connectedTo = Object.keys(this.meshAgents).filter(item => (item == client) )
				if(connectedTo){
					this.drawGraph([connectedTo], this.connIdx)
				}
			} 
			else 
			{
				const clientnode = this.dhcpLease.find(dhcpclient => dhcpclient.mac === client)
				const label = clientnode ? (clientnode.hostname != "*"? clientnode.hostname: client): client
				let subclientModel = "imac pro"
				let subclientInfo = {
					id: ++this.connIdx
					// , label: `${client}-${this.connIdx}`
					, label: `${label}`
					, shape: 'image'
					, image: this.searchClientIcon(subclientModel, client.signal_strength)
					, info:{
						ip: clientnode ? clientnode.ip : ''
						, type: 'client'
						, line: 'wired'
						, hostname: clientnode ? clientnode.hostname : ''
						, mac: client
					}
				};
				this.topologyArr.push(subclientInfo);
				this.maclist.push(client)

				// set LINE INFO.
				let lineInfo = {
					from: masterIdx
					, to: this.connIdx
					, smooth: {
						type: 'cubicBezier'
					}
					, label: ''
					, width: 3
					, color: this.setLineFeature('wired')	// 연결 타입 확인 후 적용 필요
					, length: 150
				}
				this.connectedLineInfo.push(lineInfo);
			}
		},
		drawGraph (list, index) {
			let masterIdx = index
			list.forEach(mac => {
				const found = this.maclist.find(item => item == mac)
				// console.log("drawGraph, found", mac, found)
				if (this.meshAgents[mac] && this.meshAgents[mac].repeater === '0' && !found) {
					this.createRouterDevice(mac)
					//console.log("Router created", mac)
					masterIdx = this.connIdx
				}
				this.meshAgents[mac].bssids.forEach(bssid => {
					if (bssid) {
						bssid.clients.forEach(client => {
							const foundClientNode = this.maclist.find(item => item === client.client)
							if (!foundClientNode && client.client){
								if(masterIdx>64){
									Object.assign(this.$data, this.$options.data());
									this.$alert('Please page reload', this.t('info').cap, {
									confirmButtonText: this.t('ok'),
									type: 'info',
									center: false,
									roundButton: true,
									callback: action => {
										this.$message({
										type: 'info',
										message: `action: ${ action }`
										});
									}
									});
								}
								else {
									this.createWifiDevice(client, bssid, masterIdx)
								}
							}
						})
					}
				})
				// wired
				this.meshAgents[mac].wired_clients.forEach(client => {
					const foundClientNode = this.maclist.find(item => item === client)
					if (!foundClientNode) {
						this.createLanDevice(client, masterIdx)
					}
				})
			})
			
			//list.forEach(mac => {
			//	const connectedTo = Object.keys(this.meshAgents).filter(item => this.meshAgents[item].connected_to === mac)
			//	this.drawGraph(connectedTo, masterIdx, "list.foreach")
			//})

			//console.log("topologyArr", this.topologyArr)
			//console.log("connectedLineInfo", this.connectedLineInfo)
			//console.log("dhcpLease", this.dhcpLease)
		}
	}
}
</script>

<style scoped>
	.network{
	  height: 70vh;
	}
	.vis-tooltip {
		border-radius: 30px !important; 
		padding: 10px !important;
		background: #249ad7 !important;
		color: #ffffff !important;
		border: 0px !important; 
	}

</style>
