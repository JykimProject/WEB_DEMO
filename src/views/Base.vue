<template>
	<!--section class="content-section"-->
	<div class="container" v-loading="loading">
		<!-- start : aside section -->
		<!-- class option : none / active -->
		<!--aside class="aside" -->
		<div class="layout layout--split">
			<aside class="aside layout--split__sidebar" :class="{ 'collapsed': collapsed}"  ><!--@click='closeSidebar' 'is-active': sidebarOpen,-->
				<div class="links-menu main-menu collapsed">
					<sidebar-menu
					:collapsed="collapsed"
					:menu="menu"
					:theme="selectedTheme"
					:show-one-child="true"
					:width="max_width"
					@toggle-collapse="onToggleCollapse"
					>
						<template v-slot:toggle-icon><span class="vsm--toggle-btn_default" /></template>
					</sidebar-menu>
					<div class="btn-close "></div>
				</div>
			</aside>
			<div class="layout--split__content" :class="{'collapsed': collapsed}">
			<section>
				<router-view></router-view>
			</section>
			</div>
		</div>
		<div @click='closeSidebar' class="overlay overlay--nav" ></div> <!--:class="{'overlay--visible': sidebarOpen}"-->
		<!-- end : aside section -->
	</div>
</template>

<script>
import ws from "@/shared/lib/ws"
import { RPC, API } from "@/shared/constants"

export default {
	data() {
		return {
			board: {
				board_name: "",
				hostname: "",
				kernel: "",
				architecture: "",
				model: "",
				release: {
					description: "",
					distribution: "",
					revision: "",
					target: "",
					version: "",
				},
			},
			rtmode: "",
			mesh: "",
			authlv: "",
			pages: {
				mesh: false,
				nat: false,
				advanced: false,
				vpn: false,
				qos: false,
				security: false,
				administration: false
			},
			loading: false,
			collapsed: false,
			selectedTheme: 'white-theme',
			isOnMobile: false,
			max_width: '290px',
			min_width: '290px',
			menu: [],
		}
	},
	computed: {
	},
	methods: {
		onToggleCollapse (collapsed) {
			this.collapsed = collapsed
		},
		closeSidebar (event) {
			const parent = event.target.parentNode
			if (
				parent.classList.contains('has--sublinks') ||
				(parent.parentNode && parent.parentNode.classList.contains('has--sublinks'))
			) {
				return
			}
			this.$store.commit('SET_STATUS', {path: 'sidebar.open', val: false})
		},
		onResize () {
			if (window.innerWidth <= 1000) {
				this.isOnMobile = true
				this.collapsed = true
			} else {
				this.isOnMobile = false
				this.collapsed = false
			}
		},
	},
	mounted() {
		this.menu = [
			{
				title: this.t("network").upper,
				hidden: !this.$buildOptions.networkPage,
				icon: {
					element: 'img',
					attributes: {
						'src': '/img/iconset-lan.png'
					}
				},
				child: [
					{
						href: "/home/network/lan",
						title: this.t("lan").cap,
						hidden: !this.$buildOptions.networkLanPage,
					},
					{
						href: "/home/network/staticrouting",
						title: this.t("staticrouting").cap,
						hidden: !this.$buildOptions.networkStaticroutingPage
					},
				],
			},
			{
				title: this.t("vpn").upper,
				hidden: !this.$buildOptions.vpnPage,
				icon: {
					element: 'img',
					attributes: {
						'src': '/img/iconset-securly.png'
					}
				},
				child: [
					{
						href: "/home/vpn/ipsec",
						title: this.t("ipsec").cap,
						hidden: !this.$buildOptions.vpnIpsecPage
					},
				],
			},
		]
		/*
		this.loading = true
		Promise.all([
			ws.call(RPC.system.board),
			ws.call(API.feature)
		]).then(
			([
				{ dict: board },
				{ dict: feature }
			]) => {
				this.menu = []
				this.onResize()
				window.addEventListener('resize', this.onResize)

				this.board = board
				this.rtmode = feature.rtmode
				this.mesh = feature.mesh
				this.authlv = feature.authlv

				this.pages.mesh = this.$buildOptions.meshPage && this.mesh != '0'
				this.pages.nat = this.$buildOptions.natPage && this.rtmode == 'router'
				this.pages.advanced = this.$buildOptions.advancedPage && this.authlv != 'user'
				this.pages.vpn = this.$buildOptions.vpnPage && this.authlv != 'user'
				this.pages.qos = this.$buildOptions.qosPage && this.authlv != 'user'
				this.pages.security = this.$buildOptions.securityPage && this.authlv != 'user'
				this.pages.administration = this.$buildOptions.adminPage && this.authlv != 'user'
				this.menu = [
					{
						title: this.t("status").upper,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-info.png'
							}
						},
						child: [
							{
								href: "/home/status/dashboard",
								title: this.t("dashboard").cap,
								hidden: !this.$buildOptions.statusDashboardPage
							},
							{
								href: "/home/status/arp",
								title: this.t("arp").cap,
								hidden: !this.$buildOptions.statusArpPage
							},
							{
								href: "/home/status/statistics",
								title: this.t("statistics").cap,
								hidden: !this.$buildOptions.statusStatisticsPage
							},
						],
					},
					{
						title: this.t("wireless-settings").upper,
						hidden: !this.$buildOptions.wirelessPage,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-wifi.png'
							}
						},
						child: [
							{
								href: "/home/wifi/main",
								title: this.t("main").cap,
								hidden: !this.$buildOptions.wirelessMainPage,
							},
							{
								href: "/home/wifi/guest",
								title: this.t("guest").cap,
								hidden: !this.$buildOptions.wirelessGuestPage,
							},
						],
					},
					{
						title: this.t("mesh").upper,
						hidden: !this.pages.mesh,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-wifi.png'
							}
						},
						child: [
							{
								href: "/home/mesh/fronthaul",
								title: this.t("fronthaul").cap,
								hidden: !this.$buildOptions.meshFronthaulPage,
							},
							{
								href: "/home/mesh/backhaul",
								title: this.t("backhaul").cap,
								hidden: !this.$buildOptions.meshBackhaulPage,
							},
						],
					},
					{
						title: this.t("network").upper,
						hidden: !this.$buildOptions.networkPage,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-lan.png'
							}
						},
						child: [
							{
								href: "/home/network/lan",
								title: this.t("lan").cap,
								hidden: !this.$buildOptions.networkLanPage,
							},
							{
								href: "/home/network/staticrouting",
								title: this.t("staticrouting").cap,
								hidden: !this.$buildOptions.networkStaticroutingPage
							},
							{
								href: "/home/network/wan",
								title: this.t("wan").cap,
								hidden: !this.$buildOptions.networkWanPage
							},
							{
								href: "/home/network/wanmode",
								title: this.t("wanmode").cap,
								hidden: !this.$buildOptions.networkWanmodePage
							},
						],
					},
					{
						title: this.t("nat").upper,
						hidden: !this.$buildOptions.natPage,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-routing.png'
							}
						},
						child: [
							{
								href: "/home/nat/portforwarding",
								title: this.t("portforwarding").cap,
								hidden: !this.$buildOptions.natPortforwardingPage
							},
							{
								href: "/home/nat/portTrigger",
								title: this.t("portTrigger").cap,
								hidden: !this.$buildOptions.natPortTriggerPage
							},
							{
								href: "/home/nat/dmz",
								title: this.t("dmz").cap,
								hidden: !this.$buildOptions.natDmzPage
							},
							{
								href: "/home/nat/upnp",
								title: this.t("upnp").cap,
								hidden: !this.$buildOptions.natUpnpPage
							},
							{
								href: "/home/nat/sessioncontrol",
								title: this.t('tcp').cap + "/" + this.t('udp').cap,
								hidden: !this.$buildOptions.natSessioncontrolPage
							},
						],
					},
					{
						title: this.t("advanced").upper,
						hidden: !this.$buildOptions.advancedPage,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-advanced.png'
							}
						},
						child: [
							{
								href: "/home/advanced/ddnt",
								title: this.t("ddnt").cap,
								hidden: !this.$buildOptions.advancedDdntPage
							},
							{
								href: "/home/advanced/cwmp",
								title: this.t("cwmp").cap,
								hidden: !this.$buildOptions.advancedCwmpPage
							},
							{
								href: "/home/advanced/twamp",
								title: this.t("twamp").cap,
								hidden: !this.$buildOptions.advancedTwampPage
							},
							{
								href: "/home/advanced/portmirroring",
								title: this.t("portmirroring").cap,
								hidden: !this.$buildOptions.advancedPortmirroringPage
							},
						],
					},
					{
						title: this.t("vpn").upper,
						hidden: !this.$buildOptions.vpnPage,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-securly.png'
							}
						},
						child: [
							{
								href: "/home/vpn/status",
								title: this.t("status").cap,
								hidden: !this.$buildOptions.vpnStatusPage
							},
							{
								href: "/home/vpn/openvpn",
								title: this.t("openvpn").cap,
								hidden: !this.$buildOptions.vpnOpenvpnPage
							},
							{
								href: "/home/vpn/pptp",
								title: this.t("pptp").cap,
								hidden: !this.$buildOptions.vpnPptpPage
							},
							{
								href: "/home/vpn/ipsec",
								title: this.t("ipsec").cap,
								hidden: !this.$buildOptions.vpnIpsecPage
							},
							{
								href: "/home/vpn/advanced",
								title: this.t("advanced").cap,
								hidden: !this.$buildOptions.vpnAdvancedPage
							},
						],
					},
					{
						title: this.t("qos"),
						hidden: !this.$buildOptions.qosPage,
						href: "/home/qos",
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-info.png'
							}
						},
					},
					{
						title: this.t("security").upper,
						hidden: !this.$buildOptions.securityPage,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-admin.png'
							}
						},
						child: [
							{
								href: "/home/security/ipfilter",
								title: this.t("ipfilter").cap,
								hidden: !this.$buildOptions.securityIpfilterPage
							},
							{
								href: "/home/security/macfilter",
								title: this.t("macfilter").cap,
								hidden: !this.$buildOptions.securityMacfilterPage
							},
							{
								href: "/home/security/portfilter",
								title: this.t("portfilter").cap,
								hidden: !this.$buildOptions.securityPortfilterPage
							},
							{
								href: "/home/security/parentalcontrol",
								title: this.t("parentalcontrol").cap,
								hidden: !this.$buildOptions.securityParentalcontrolPage
							},
							{
								href: "/home/security/spifirewall",
								title: this.t("spifirewall").cap,
								hidden: !this.$buildOptions.securitySpifirewallPage
							},
						],
					},
					{
						title: this.t("administration").upper,
						hidden: !this.$buildOptions.adminPage,
						icon: {
							element: 'img',
							attributes: {
								'src': '/img/iconset-info.png'
							}
						},
						child: [
							{
								href: "/home/administration/password",
								title: this.t("menu_password").cap,
								hidden: !this.$buildOptions.adminPasswordPage
							},
							{
								href: "/home/administration/backup",
								title: this.t("menu_backup").cap,
								hidden: !this.$buildOptions.adminBackupPage
							},
							{
								href: "/home/administration/diagnostics",
								title: this.t("menu_diagnostics").cap,
								hidden: !this.$buildOptions.adminDiagnosticsPage
							},
							{
								href: "/home/administration/reboot",
								title: this.t("menu_reboot").cap,
								hidden: !this.$buildOptions.adminRebootPage
							},
							{
								href: "/home/administration/syslog",
								title: this.t("menu_syslog").cap,
								hidden: !this.$buildOptions.adminSyslogPage
							},
							{
								href: "/home/administration/accesscontrol",
								title: this.t("menu_accesscontrol").cap,
								hidden: !this.$buildOptions.adminAccesscontrolPage
							},
							{
								href: "/home/administration/upgrade",
								title: this.t("menu_upgrade").cap,
								hidden: !this.$buildOptions.adminUpgradePage
							},
						],
					},
				]
			}
		)
		.finally(() => this.loading = false )
		*/
	}
}
</script>
<style>
.router-link-active {
	color: #0e7ae6
}
</style>
