<template>
	<section class="section">
		<div class="module-tab">
			<ul class="tab-label-list tab-label-list-2">
				<!-- class option : none / active / disabled -->
				<li class="tab-label-item" v-for='tab in tabs' :class="{ 'active': currentTab === tab.id }"
					@click="currentTab = tab.id, currentType = tab.type" :key='tab.id'>
					<div class="tab-label">{{ t(tab.label) }}</div>
				</li>
			</ul>
			<form :name='dhcpForm.name' @submit.prevent v-loading="loading" v-if="currentType == 'ipv4'">

				<div class="table-title">{{ t('lan-network-settings') }}</div>
				<table class="table-setting-wide">
					<tr>
						<th>
							<label class="form-label" for="ip_address">{{ t("ip-address").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="ip_address" v-model='lanForm.fields.ipaddr'
								:validate="['filled']">
						</td>
					</tr>
					<tr>
						<th>
							<label class="form-label" for="subnet-mask">{{ t("subnet-mask").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="subnet-mask" v-model='lanForm.fields.netmask'
								:validate="['filled']">
						</td>
					</tr>
				</table>
				<hr>

				<div class="table-title">{{ t('secondary').cap }} {{ t('lan-network-settings') }}</div>
				<table class="table-setting-wide">
					<tr>
						<th>
							<label class="form-label" for="enabled">{{ t("enabled").cap }}</label>
						</th>
						<td>
							<div class="form-checkbox">
								<input type="checkbox" id="enabled_secondary" class="checkbox" v-model='secondarylanForm.fields.disabled'>
								<label class="label" for="enabled_secondary">checkbox label</label>
							</div>
						</td>
					</tr>
					<tr v-if="secondarylanForm.fields.disabled">
						<th>
							<label class="form-label" for="sec_ip_address">{{ t("ip-address").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="sec_ip_address" v-model='secondarylanForm.fields.ipaddr'
								:validate="['filled']">
						</td>
					</tr>
					<tr v-if="secondarylanForm.fields.disabled">
						<th>
							<label class="form-label" for="sec_subnet_mask">{{ t("subnet-mask").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="sec_subnet_mask" v-model='secondarylanForm.fields.netmask'
								:validate="['filled']">
						</td>
					</tr>
				</table>
				<hr>
	
				<div class="table-title">{{ t('dhcp-server') + ' ' + t('settings') }}</div>
				<table class="table-setting-wide">
					<tr>
						<th>
							<label class="form-label" for="enabled" v-if="ignore">{{ t("enabled").cap }}</label>
							<label class="form-label" for="enabled" v-else>{{ t("disabled").cap }}</label>
						</th>
						<td>
							<div class="form-checkbox">
								<input type="checkbox" id="enabled" class="checkbox" v-model='ignore' :true-value='true'
									:false-value='false'
									@change='$emit("on-field-change", "ignore", false, !$event.target.checked)'>
								<label class="label" for="enabled">checkbox label</label>
							</div>
						</td>
					</tr>

				</table>

				<ul class="list-setting" v-if="ignore">
					<li>
						<div class="label-sm">
							<label class="form-label" for="start">{{ t("start").cap }}</label>
							<input type="text" class="form-control" id="start" v-model='start_ip'>
						</div>
					</li>
					<li>
						<div class="label-sm">
							<label class="form-label" for="cpe">{{ t("number-of-cpes").cap }}</label>
							<input type="text" class="form-control" id="cpe" v-model='dhcpForm.fields.limit'>
						</div>
					</li>
					<li>
						<div class="label-sm">
							<label class="form-label" for="lease-time">{{ t('lease-time-tooltip').cap }}</label>
							<input type="text" class="form-control" id="lease-time" v-model='dhcpForm.fields.leasetime'>
						</div>
					</li>
				</ul>

				<hr>
				<div class="table-title">{{ t('lan-network-igmp') }}</div>
				<table class="table-setting-wide">
					<tr>
						<th>
							<label class="form-label" for="enabled">{{ t("enabled").cap }}</label>
						</th>
						<td>
							<div class="form-checkbox">
								<input type="checkbox" id="igmp_snoop" class="checkbox" v-model='dhcpForm.fields.igmp_snoop'
									:true-value='"1"' :false-value='"0"'>
								<label class="label" for="igmp_snoop">checkbox label</label>
							</div>
						</td>
					</tr>
				</table>

				<hr>
				<div class="table-title">{{ t('dns-settings') }}</div>
				<p class="text-sm text-info" v-if="froze_set">
					<strong>{{ t('dnsv4-error') }}</strong>
				</p>
				<table class="table-setting-wide">
					<tr>
						<th>
							<label class="form-label" for="enabled_1_dns">{{ t("dns-proxy").cap }}</label>
						</th>
						<td>
							<div class="form-checkbox">
								<input type="checkbox" id="enabled_dns" class="checkbox" v-model='dnsForm.fields.useUserDns'
									:true-value='true' :false-value='false'>
								<label class="label" for="enabled_dns">checkbox label</label>
							</div>
						</td>
					</tr>

					<tr v-if= !dnsForm.fields.useUserDns>
						<th>
							<label class="form-label" for="pri-dns">{{ t("primary-dns").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="primarydns" v-model='dnsForm.fields.primaryDns'
								:disabled="dnsForm.fields.useUserDns">
						</td>
					</tr>

					<tr v-if= !dnsForm.fields.useUserDns>
						<th>
							<label class="form-label" for="sec-dns">{{ t("secondary-dns").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="seconddns" v-model='dnsForm.fields.secondaryDns'
								:disabled="dnsForm.fields.useUserDns">
						</td>
					</tr>
				</table>
				<hr>

				<div class="table-title">{{ t('static-ip-settings') }}</div>
				<table class="table-setting-wide">
					<tr>
						<th>
							<label class="form-label" for="static-mac">{{ t("mac").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="static_mac" v-model='dhcpForm.staticfields.macaddr'>
						</td>
					</tr>
					<tr>
						<th>
							<label class="form-label" for="static-ip">{{ t("ip").cap }}</label>
						</th>
						<td>
							<input type="text" class="form-control" id="static_ip" v-model='dhcpForm.staticfields.ipaddr'>
						</td>
					</tr>
				</table>
				<div class="btn-area btn-setting-area btn-right">
					<button class="btn btn-secondary btn-wide" type="button" @click="openForm">{{ t('backup')+" & "+t('restore') }}</button>
				</div>
				<section class="section">
					<filter-table v-loading="loading"
						:columns="devices.columns"
						:data='devices.data'
						@delete='onRowDelete'
						@add='openForm'
					>
					</filter-table>
					<filter-form v-if="formShown"  @close='closeForm'></filter-form>
				</section>
				<div class="btn-area btn-setting-area">
					<button @click="save" class="btn btn-primary" type="submit">{{ t('save').cap }}</button>
				</div>
			</form>

			<form :name='dhcpForm.name' @submit.prevent v-loading="loading" v-else-if="currentType === 'ipv6'">
				<div class="table-title">{{ t('ipv6-setting') }}</div>
				<table class="table-setting-wide">
					<tr>
						<th>
							<label class="form-label" for="ipv6">{{ t("enable-ipv6").cap }}</label>
						</th>
						<td>
							<div class="form-checkbox">
								<input type="checkbox" class="checkbox" id="ipv6" v-model='ipv6.fields.ipv6'
								true-value='1' false-value='0'>
								<label class="label" for="ipv6">{{ `Checkbox label ipv6` }}</label>
							</div>
						</td>
					</tr>
				</table>
				<hr>
				<div v-if="ipv6.fields.ipv6 === '1'">
					<div class="table-title">{{ t('lan-network-settings') }}</div>
					<table class="table-setting-wide">
						<tr>
							<th>
								<label class="form-label" for="ipv6-address">{{ t("ipv6-address").cap }}</label>
							</th>
							<td>
								<input type="text" class="form-control" id="ipv6-address" v-model='ipv6.fields.ip6addr'
									:validate="['filled']">
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="ip6-prefix">{{ t("ipv6").cap }} {{ t("prefix-length").cap }}</label>
							</th>
							<td>
								<input type="text" class="form-control" id="ip6-prefix" v-model='ipv6.fields.ip6prefix'
									:validate="['filled']">
							</td>
						</tr>
					</table>
					<hr>

					<div class="table-title">{{ t('address-type').cap }}</div>
					<table class="table-setting-wide">
						<tbody>
							<tr>
								<th>
									<label class="form-label">{{ t("radvd").cap }}</label>
								</th>
								<td>
									<label class="form-label">{{ t("dhcpv6-server").cap }}</label>
								</td>
							</tr>
							<tr>
								<th>
									<div class="form-checkbox">
										<input type="checkbox" class="checkbox" id="ra" name="ra"
											:checked="ipv6.fields.ra === 'server'"
											@change="updateAddressType('ra')">
										<label class="label" for="ra">{{ `Checkbox label ra` }}</label>
									</div>
								</th>
								<td>
									<div class="form-checkbox">
										<input type="checkbox" class="checkbox" id="dhcpv6" name="dhcpv6"
											:checked="ipv6.fields.dhcpv6 === 'server'"
											@change="updateAddressType('dhcpv6')">
										<label class="label" for="dhcpv6">{{ `Checkbox label dhcpv6` }}</label>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="table-setting-wide" v-if="ipv6.fields.dhcpv6 === 'server'">
						<tr>
							<th>
								<label class="form-label" for="start">{{ t("starting-ipv6-address").cap }}</label>
							</th>
							<td>
								<div style="display: flex; align-items: center;">
									::&nbsp;<input type="text" class="form-control" id="start" v-model='ipv6.fields.dhcpv6_lease_start' placeholder='aaaa'>
								</div>
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="end">{{ t("ending-ipv6-address").cap }}</label>
							</th>
							<td>
								<div style="display: flex; align-items: center;">
									::&nbsp;<input type="text" class="form-control" id="end" v-model='ipv6.fields.dhcpv6_lease_end' placeholder='fffe'>
								</div>
							</td>
						</tr>
					</table>

					<table class="table-setting-wide" v-if="ipv6.fields.ra === 'server'">
						<tr>
							<th>
								<label class="form-label" for="ra_slaac"
									@mouseenter="showtip['ra_slaac'] = true"
									@mouseleave="showtip['ra_slaac'] = false">
									{{ t("ra-slaac").cap }}
									<b-icon font-scale="1.2" icon="question-circle-fill" :style="{ color: '#0E7AE6'}"
										v-if="showtip['ra_slaac']" v-b-tooltip.click.rightbottom="t('ra-slaac-info').str" >
									</b-icon>
								</label>
							</th>
							<td>
								<div class="form-checkbox">
									<input type="checkbox" class="checkbox" id="ra_slaac" v-model='ipv6.fields.ra_slaac'
									true-value='1' false-value='0'>
									<label class="label" for="ra_slaac">{{ `Checkbox label ra_slaac` }}</label>
								</div>
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="ra_flags"
									@mouseenter="showtip['ra_flags'] = true"
									@mouseleave="showtip['ra_flags'] = false">
									{{ t("ra-flags").cap }}
									<b-icon font-scale="1.2" icon="question-circle-fill" :style="{ color: '#0E7AE6'}"
										v-if="showtip['ra_flags']" v-b-tooltip.click.rightbottom="t('ra-flags-info').str" >
									</b-icon>
								</label>
							</th>
							<td>
								<multiselect v-model='ipv6.fields.ra_flags' :multiple="true" :options="raflagsOption">
								</multiselect>
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="ra_maxinterval"
									@mouseenter="showtip['ra_maxinterval'] = true"
									@mouseleave="showtip['ra_maxinterval'] = false">
									{{ t("ra-maxinterval").cap }}
									<b-icon font-scale="1.2" icon="question-circle-fill" :style="{ color: '#0E7AE6'}"
										v-if="showtip['ra_maxinterval']" v-b-tooltip.click.rightbottom="t('ra-maxinterval-info').str" >
									</b-icon>
								</label>
							</th>
							<td>
								<input type="text" class="form-control" id="ra_maxinterval" v-model='ipv6.fields.ra_maxinterval' placeholder='600'>
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="ra_mininterval"
									@mouseenter="showtip['ra_mininterval'] = true"
									@mouseleave="showtip['ra_mininterval'] = false">
									{{ t("ra-mininterval").cap }}
									<b-icon font-scale="1.2" icon="question-circle-fill" :style="{ color: '#0E7AE6'}"
										v-if="showtip['ra_mininterval']" v-b-tooltip.click.rightbottom="t('ra-mininterval-info').str" >
									</b-icon>
								</label>
							</th>
							<td>
								<input type="text" class="form-control" id="ra_mininterval" v-model='ipv6.fields.ra_mininterval' placeholder='200'>
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="ra_lifetime"
									@mouseenter="showtip['ra_lifetime'] = true"
									@mouseleave="showtip['ra_lifetime'] = false">
									{{ t("ra-lifetime").cap }}
									<b-icon font-scale="1.2" icon="question-circle-fill" :style="{ color: '#0E7AE6'}"
										v-if="showtip['ra_lifetime']" v-b-tooltip.click.rightbottom="t('ra-lifetime-info').str" >
									</b-icon>
								</label>
							</th>
							<td>
								<input type="text" class="form-control" id="ra_lifetime" v-model='ipv6.fields.ra_lifetime' placeholder='1800'>
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="ra_mtu"
									@mouseenter="showtip['ra_mtu'] = true"
									@mouseleave="showtip['ra_mtu'] = false">
									{{ t("ra-mtu").cap }}
									<b-icon font-scale="1.2" icon="question-circle-fill" :style="{ color: '#0E7AE6'}"
										v-if="showtip['ra_mtu']" v-b-tooltip.click.rightbottom="t('ra-mtu-info').str" >
									</b-icon>
								</label>
							</th>
							<td>
								<input type="text" class="form-control" id="ra_mtu" v-model='ipv6.fields.ra_mtu' placeholder='1500'>
							</td>
						</tr>
						<tr>
							<th>
								<label class="form-label" for="ra_hoplimit"
									@mouseenter="showtip['ra_hoplimit'] = true"
									@mouseleave="showtip['ra_hoplimit'] = false">
									{{ t("ra-hoplimit").cap }}
									<b-icon font-scale="1.2" icon="question-circle-fill" :style="{ color: '#0E7AE6'}"
										v-if="showtip['ra_hoplimit']" v-b-tooltip.click.rightbottom="t('ra-hoplimit-info').str" >
									</b-icon>
								</label>
							</th>
							<td>
								<input type="text" class="form-control" id="ra_hoplimit" v-model='ipv6.fields.ra_hoplimit' placeholder='64'>
							</td>
						</tr>
					</table>
					<hr>
					<div class="table-title">{{ t('ipv6-dns-settings') }}</div>
					<p class="text-sm text-info" v-if="froze_set">
						<strong>{{ t('dnsv4-error') }}</strong>
					</p>
					<table class="table-setting-wide">
						<tr>
							<th>
								<label class="form-label" for="primarydns">{{ t("primary-dns").cap }}</label>
							</th>
							<td>
								<input type="text" class="form-control" id="primarydns" v-model='ipv6.fields.ipv6primaryDns'>
							</td>
						</tr>

						<tr>
							<th>
								<label class="form-label" for="seconddns">{{ t("secondary-dns").cap }}</label>
							</th>
							<td>
								<input type="text" class="form-control" id="seconddns" v-model='ipv6.fields.ipv6secondaryDns'>
							</td>
						</tr>
					</table>
					<hr>
				</div>
				<div class="btn-area btn-setting-area">
					<button @click="save" class="btn btn-primary" type="submit">{{ t('save').cap }}</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import ws from '@/shared/lib/ws'
import { apiRPC, API, RPC } from '@/shared/constants'
import { fillObject, reportSuccess, reportError, QSpinTimer, QSpinshow, QSpinhide, reportnote, trackFields} from '@/shared/functions'
import val_ip from '@/shared/validators/ip.js'
import val_lease from '@/shared/validators/lease-time.js'
import val_subnet from '@/shared/validators/subnet-2.js'
import val_ip6 from '@/shared/validators/ip6.js'
import val_netmask from '@/shared/validators/ip4netmask.js'
import FilterTable from './table.vue'
import val_mac from '@/shared/validators/mac.js'
import Multiselect from 'vue-multiselect'
import number from '@/shared/validators/number.js'
import FilterForm from './form.vue'
import { Notification } from 'element-ui'
import is_number from '@/shared/validators/is-number.js'
import onlynumber from '@/shared/validators/onlynumber.js'

const LAN_SECTION = 'lan'
const DHCP_RELAY_SECTION = 'ipv4'
const LAN_TYPE = 'interface'

export default {
	components: {
		FilterTable,
		Multiselect,
		FilterForm,
	},
	data() {
		return {
			tabs:[
				{ id: 'ipv4', type: 'ipv4', label: 'ipv4'},
				{ id: 'ipv6', type: 'ipv6', label: 'ipv6'},
			],
			currentTab: 'ipv4',
			currentType: 'ipv4',
			lanForm: {
				name: 'lan-form',
				fields: {
					ipaddr: '',
					netmask: '',
				},
			},
			secondarylanForm: {
				name: 'secondary-lan-form',
				fields: {
					disabled: 0,
					ipaddr: '',
					netmask: ''
				},
			},
			dhcpForm: {
				name: 'dhcp-form',
				fields: {
					start: '',
					limit: '',
					leasetime: '',
					ignore: '',
					igmp_snoop: '',
				},
				staticfields: {
					macaddr: '',
					ipaddr: '',
				},
			},
			dnsForm: {
				name: 'dns-form',
				fields: {
					primaryDns: '',
					secondaryDns: '',
					useUserDns: false
				},
			},
			oldData: {
				lanForm: {
					name: 'lan-form',
					fields: {
						ipaddr: '',
						netmask: '',
					},
				},
				secondarylanForm: {
					name: 'secondary-lan-form',
					fields: {
						disabled: 0,
						ipaddr: '',
						netmask: ''
					},
				},
				dhcpForm: {
					name: 'dhcp-form',
					fields: {
						start: '',
						limit: '',
						leasetime: '',
						ignore: '',
						igmp_snoop: '',
					},
					staticfields: {
						macaddr: '',
						ipaddr: '',
					},
				},
				ignore : false,
				dnsForm: {
					name: 'dns-form',
					fields: {
						primaryDns: '',
						secondaryDns: '',
						useUserDns: false
					},
				},
				start_ip: '',

				ipv6: {
					name: 'ipv6-form',
					fields: {
						ip6addr: '',
						ip6prefix: '',
						ipv6primaryDns: '',
						ipv6secondaryDns: '',
						dhcpv6: '',
						dhcpv6_lease_start: '',
						dhcpv6_lease_end: '',
						ra: '',
						ra_slaac: '',
						ra_flags: '',
						ra_maxinterval:'',
						ra_mininterval:'',
						ra_lifetime:'',
						ra_mtu:'',
						ra_hoplimit:'',
					},
				},
			},
			ipv6:{
				name: 'ipv6-form',
				fields: {
					ipv6: '1',
					ip6addr: '',
					ip6prefix: '',
					ipv6primaryDns: '',
					ipv6secondaryDns: '',
					dhcpv6: '',
					dhcpv6_lease_start: '',
					dhcpv6_lease_end: '',
					ra: '',
					ra_slaac: '',
					ra_flags: '',
					ra_maxinterval:'',
					ra_mininterval:'',
					ra_lifetime:'',
					ra_mtu:'',
					ra_hoplimit:'',
				},
			},
			devices: {
				columns: [
					{ name: this.t('mac').cap, key: '1'},
					{ name: this.t('ip').cap, key: '2'},
					{ name: this.t('actions').cap, key: 'actions'},
				],
				data: [],
			},
			ignore: false,
			start_ip: '',
			SpinTime: 0,
			fetchInterval: '',
			loading: false,
			relay_trig: false,
			save_ipaddr: '',
			confirmModalShown: '',
			froze_set: '',
			static4 : '',
			mask_binary: '',
			out_of_range: false,
			max_client: 0,
			set_comp: false,
			ar2448_administrator: '',
			formShown: false,
			onsetting: false,
			raflagsOption: [
				'managed-config',
				'other-config'
			],
			showtip: {
				"ra_slaac": false,
				"ra_flags": false,
				"ra_maxinterval": false,
				"ra_mininterval": false,
				"ra_lifetime": false,
				"ra_mtu": false,
				"ra_hoplimit": false,
			},
		}
	},
	watch: {
		'currentTab'() {
			//this.loading = true
			this.fetchData()
		},
		'lanForm.fields.ipaddr'(newIP) {
			if (!this.set_comp)
				return
			if (val_ip(this.lanForm.fields.ipaddr) || val_netmask(this.lanForm.fields.netmask) || val_ip(this.start_ip)) {
				return
			}
			this.autoPool()
		},
		'lanForm.fields.netmask'(newMask) {
			if (!this.set_comp)
				return
			if (val_ip(this.lanForm.fields.ipaddr) || val_netmask(this.lanForm.fields.netmask) || val_ip(this.start_ip)) {
				return
			}
			let binary_mask = [] //mask[0].toString(2) + mask[2].toString(2) + mask[2].toString(2) + mask[3].toString(2)
			binary_mask.push(parseInt(newMask.split('.')[0]).toString(2))
			binary_mask.push(parseInt(newMask.split('.')[1]).toString(2))
			binary_mask.push(parseInt(newMask.split('.')[2]).toString(2))
			binary_mask.push(parseInt(newMask.split('.')[3]).toString(2))
			while (binary_mask[0].length < 8)
				binary_mask[0] = '0' + binary_mask[0]
			while (binary_mask[1].length < 8)
				binary_mask[1] = '0' + binary_mask[1]
			while (binary_mask[2].length < 8)
				binary_mask[2] = '0' + binary_mask[2]
			while (binary_mask[3].length < 8)
				binary_mask[3] = '0' + binary_mask[3]
			let bin_netmask = binary_mask[0] + binary_mask[1] + binary_mask[2] + binary_mask[3]

			let zero = false
			for (let at = 0; at < bin_netmask.length; at++) {
				if (!zero && bin_netmask[at] == '0')
					zero = true
				if (zero && bin_netmask[at] == '1')
					return
			}
			if (newMask == "0.0.0.0" || newMask == "255.255.255.255")
				return
			this.autoPool()
		},
		'start_ip'(newIP) {
			if (!this.set_comp)
				return
			if (val_ip(this.lanForm.fields.ipaddr) || val_netmask(this.lanForm.fields.netmask) || val_ip(this.start_ip)) {
				return
			}
			this.getMaxClient()
		},
		'dhcpForm.fields.limit'(newValue) {
			if (onlynumber(newValue))
				this.dhcpForm.fields.limit = newValue.slice(0, -1);
		},
	},
	mounted() {
		let loadingpage = sessionStorage.getItem('startTime');
		if (loadingpage){
			QSpinTimer(3).finally(()=> reportSuccess())
		}

		this.fetchData()
	},
	methods: {
		async onsetting_check() {
			return false;
			try {
				const { dict } = await ws.call(API.wireless.global.get);
				this.onsetting = dict && dict.onsetting == '1';
			} catch (error) {
				this.onsetting = false;
			}
			return this.onsetting;
		},
		updateAddressType(value) {
			if (value === 'ra') {
				if( this.ipv6.fields.ra === 'server' ) {
					this.ipv6.fields.ra = ''
				}
				else {
					this.ipv6.fields.ra = 'server'
				}
			}
			else {
				if( this.ipv6.fields.dhcpv6 === 'server' ) {
					this.ipv6.fields.dhcpv6 = ''
				}
				else {
					this.ipv6.fields.dhcpv6 = 'server'
				}
			}
		},
		isInRange(leaseStart, leaseEnd) {
			const isHex = /[0-9A-Fa-f]+$/

			if (isHex.test(leaseStart) && isHex.test(leaseEnd)) {
				const startDec = parseInt(leaseStart, 16)
				const endDec = parseInt(leaseEnd, 16)
				if (startDec >= 0x0001 && endDec <= 0xFFFE && startDec <= endDec) {
					return false
				}
			}

			return true
		},
		async openForm() {
			if (await this.onsetting_check()) {
				Notification.info({
					title: "Notification",
					message: this.t('warning-wireless-loading'),
					duration: 3 * 1000
				})
				return
			}
			this.formShown = true
		},
		closeForm(refresh) {
			if (refresh) {
				this.fetchData()
			}
			this.formShown = false
			window.scrollTo(0, 0)
		},
		fetchData() {
			//this.loading = true
			this.set_comp = false

			const receive = []
			Promise.all([
				ws.call(API.network.lan.get),
				ws.call(API.dhcp.get)
			]).then(([{ dict: lanlist }, { dict: dhcpLan }]) => {
				fillObject(this.dhcpForm.fields, dhcpLan)
				fillObject(this.ipv6.fields, dhcpLan)

				if(!dhcpLan.ip6addr && !dhcpLan.ip6prefix){
					this.ipv6.fields.ip6addr = ''
					this.ipv6.fields.ip6prefix = ''
				}

				if (dhcpLan.ra_flags) {
					if(dhcpLan.ra_flags.length != 0)
						this.ipv6.fields.ra_flags = dhcpLan.ra_flags.split(' ')
				}

				this.ipv6.fields.dhcpv6_lease_start = dhcpLan.dhcpv6_lease_start.replace(/^0x/, '')
				this.ipv6.fields.dhcpv6_lease_end = dhcpLan.dhcpv6_lease_end.replace(/^0x/, '')
				this.ipv6.fields.dhcpv6 = dhcpLan.dhcpv6
				const lan = lanlist.list.find(item => item.name == 'lan')
				const secondarylan = lanlist.list.find(item => item.name == 'lan_secondary')

				if(lan != undefined) {
					fillObject(this.lanForm.fields, lan)
					fillObject(this.ipv6.fields, lan)
					if (this.ipv6.fields.ip6prefix)
						this.ipv6.fields.ip6prefix = this.ipv6.fields.ip6prefix.split('/')[1]
				}

				if(secondarylan != undefined)
					fillObject(this.secondarylanForm.fields, secondarylan)

				this.ignore = (this.dhcpForm.fields.ignore == "0" ? true : false)
				this.dhcpForm.fields.igmp_snoop = dhcpLan.igmp_snoop

				let network_address = this.to32bit(this.intToIp(this.ipToInt(lan.ipaddr) & this.ipToInt(lan.netmask)))
				let start_binary = parseInt(this.dhcpForm.fields.start).toString(2)
				this.start_ip = this.intToIp(parseInt(network_address, 2) + parseInt(start_binary, 2))
				this.getMaxClient()

				this.save_ipaddr = this.lanForm.fields.ipaddr
				this.dhcpForm.staticfields.macaddr = ''
				this.dhcpForm.staticfields.ipaddr = ''

				this.untrackFields = trackFields.call(this, 'lanForm')
				this.untrackFields = trackFields.call(this, 'secondarylanForm')
				this.untrackFields = trackFields.call(this, 'ipv6')
				/* @DSPARK, 20230707. ADD IPv6 DNS Value*/
				var ipv6_dns = []

				if (dhcpLan.dns6 != null)
				{
					ipv6_dns = dhcpLan.dns6.split(" ")
				}
				for(let i = 0; i < 2; i++)
				{
					if((ipv6_dns[i] == 'undefined') || (ipv6_dns[i] == "(null)"))
					{
						this.ipv6.fields.ipv6primaryDns = ''
						this.ipv6.fields.ipv6secondaryDns = ''
					}
					else
					{
						this.ipv6.fields.ipv6primaryDns = ipv6_dns[0]
						this.ipv6.fields.ipv6secondaryDns = ipv6_dns[1]
					}
				}

				if (dhcpLan.dhcp_option) {
					let optionArray = JSON.stringify(dhcpLan.dhcp_option).split('"')
					optionArray.forEach((value) => {
						if (value.startsWith("6,")) {
							let dnsArray = value.split(',')
							this.dnsForm.fields.primaryDns = dnsArray[1] || ''
							this.dnsForm.fields.secondaryDns = dnsArray[2] || ''
						}
					})
				}
				else {
					this.dnsForm.fields.primaryDns = ''
					this.dnsForm.fields.secondaryDns = ''
					this.dnsForm.fields.useUserDns = false
				}

				if (dhcpLan.dns_enable == "1" || this.dnsForm.fields.primaryDns == '')
				{
					this.dnsForm.fields.useUserDns = true
				}
				else
				{
					this.dnsForm.fields.useUserDns = false
				}
				this.oldData.lanForm = JSON.parse(JSON.stringify(this.lanForm))
				this.oldData.secondarylanForm = JSON.parse(JSON.stringify(this.secondarylanForm))
				this.oldData.dhcpForm = JSON.parse(JSON.stringify(this.dhcpForm))
				this.oldData.dnsForm = JSON.parse(JSON.stringify(this.dnsForm))
				this.oldData.start_ip = this.start_ip
				this.oldData.ignore = this.ignore
				this.oldData.ipv6 = JSON.parse(JSON.stringify(this.ipv6))

			})
			.catch(err => reportError(err))
			.finally(() =>
				this.loading = false,
				this.fetchStatic(),
			)
		},
		fetchStatic () {
			this.devices.data = []
			ws.call(API.dhcp.static.get).then(({ dict }) => {
				for (let i = 0; i < Object.keys(dict).length; i++) {
					if (Object.keys(dict)[i] == 'code') continue
					let static_info = {mac: '', ip: ''}
					static_info.mac = Object.values(dict)[i].split(' ')[0]
					static_info.ip = Object.values(dict)[i].split(' ')[1]
					this.devices.data.push(static_info)
				}
			})
			.catch(err => reportError(err))
			.finally(()=> this.set_comp = true)
		},
		duplicatedCheck() {
			for (let i = 0; i < this.devices.data.length; i++) {
				if (this.dhcpForm.staticfields.macaddr == this.devices.data[i].mac || this.dhcpForm.staticfields.ipaddr == this.devices.data[i].ip) {
					return true
				}
			}
			return false
		},

		async save() {
		},
		onRowDelete(rowIndex) {
			this.deleteRule(this.devices.data[rowIndex])
		},
		deleteRule (rule) {
			QSpinshow()
			let params = {
				session_name: rule.mac + " " + rule.ip,
			}

			if (confirm(this.t('are-you-sure-to-delete').cap)) {
				ws.call(API.dhcp.static.del, params)
				.then(() => {
					ws.call(API.commit)
				})
				.finally(() => {
					this.set_comp = false
					this.fetchData()
					QSpinhide()
				})
			}
			else {
				QSpinhide()
			}
		},
		networkaddr_check(ip, sip) {
			const ip_binary = this.to32bit(ip)
			const sip_binary = this.to32bit(sip)

			for (let bit = 0; bit < this.getMaskLength(); bit++) {
				if ( ip_binary[bit] != sip_binary[bit]) {
					return false
				}
			}
			return true
		},
		to32bit(address) {
			return address.split('.')
				.map(octet => parseInt(octet, 10).toString(2))
				.map(binaryOctet => binaryOctet.padStart(8, '0'))
				.join('');
		},
		getMaskLength() {
			let left_num = [0, 128, 192, 224, 240, 248, 252, 254, 255]
			let length = 0
			let mask = this.lanForm.fields.netmask

			for (let n = 0; n < 4; n++) {
				let unit = parseInt(mask.split('.')[n])
				if (unit != 255) {
					for (let bit = 0; bit < left_num.length; bit++) {
						if (unit == left_num[bit]) {
							length = length + bit
							return length
						}
					}
				}
				length = length + 8
			}
		},
		/*
			Function : getStartOffset
			- Calculate Number from Network Address to Start Address
		*/
		getStartOffset() {
			let start = this.start_ip
			let len = this.getMaskLength()
			return parseInt(this.to32bit(start).slice(len), 2)
		},
		ipToInt(ip) {
			return ip.split('.').map(octet => parseInt(octet, 10)).reduce((accumulator, octet) => (accumulator << 8) + octet) >>> 0;
		},
		intToIp(int) {
			return [(int >>> 24), (int >>> 16 & 255), (int >>> 8 & 255), (int & 255)].join('.');
		},
		/*
			Function : checkIPInRange
			- Calculate Check IP in from network_address to broadcast_address
		*/
		checkIPInRange(ip) {
			const dhcp_ip = this.lanForm.fields.ipaddr
			const subnetmask = this.lanForm.fields.netmask

			const network_address = (this.ipToInt(dhcp_ip) & this.ipToInt(subnetmask)) >>> 0
			const broadcast_address = (network_address | (~this.ipToInt(subnetmask) >>> 0)) >>> 0

			const compare_ip = this.ipToInt(ip)

			if (compare_ip > network_address && compare_ip < broadcast_address && dhcp_ip != ip) {
				return 0
			} else {
				return 1
			}
		},
		/*
			Function : getMaxClient
			- Calculate MAX number of client
		*/
		checkIPInRange_maxclient(ip) {
			const dhcp_ip = this.lanForm.fields.ipaddr
			const subnetmask = this.lanForm.fields.netmask
			const dhcp_start_ip = this.start_ip
			//const limit = this.dhcpForm.fields.limit

			const network_address = this.ipToInt(dhcp_ip) & this.ipToInt(subnetmask) >>> 0
			const broadcast_address = (network_address | (~this.ipToInt(subnetmask) >>> 0)) >>> 0
			const dhcpStart = this.ipToInt(dhcp_start_ip)
			//const dhcpEnd = Number(dhcpStart) + Number(limit) -1

			const compare_ip = this.ipToInt(ip)

			if ( compare_ip > network_address && compare_ip < broadcast_address && compare_ip >= dhcpStart) {
				return 0
			} else {
				return 1
			}
		},
		getMaxClient() {
			let mask = this.lanForm.fields.netmask
			let cvt_binary = mask.split('.').map(octet => (255 - parseInt(octet)).toString(2)).join('')
			let max_value = parseInt(cvt_binary, 2)
			if (this.checkIPInRange_maxclient(this.lanForm.fields.ipaddr) == 0)
				this.max_client = max_value - this.getStartOffset() - 1
			else
				this.max_client = max_value - this.getStartOffset()

			if (this.set_comp)
				this.dhcpForm.fields.limit = this.max_client.toString()
		},

		/*
			Function : autoPool
			- Change Start, Limit Value Automatically
		*/
		autoPool() {
			const dhcp_ip = this.lanForm.fields.ipaddr
			const subnetmask = this.lanForm.fields.netmask
			const network_address = this.ipToInt(dhcp_ip) & this.ipToInt(subnetmask)
			let na_unit = this.intToIp(network_address).split('.')
			na_unit[3] = '100'

			if (na_unit.join('.') == this.lanForm.fields.ipaddr) {
				na_unit[3] = '101'
			}
			this.start_ip = na_unit.join('.')

			this.getMaxClient()
		},
		checkBroadcast(ip) {
			const dhcp_ip = this.lanForm.fields.ipaddr
			const subnetmask = this.lanForm.fields.netmask

			const network_address = (this.ipToInt(dhcp_ip) & this.ipToInt(subnetmask)) >>> 0
			const broadcast_address = (network_address | (~this.ipToInt(subnetmask) >>> 0)) >>> 0

			const compare_ip = this.ipToInt(ip)
			if (compare_ip != broadcast_address) {
				return 0
			} else {
				return 1
			}
		},
	}
}

</script>