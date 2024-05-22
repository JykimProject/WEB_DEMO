import wireless from "@/store/wireless";

/* eslint-disable no-dupe-keys */
export function replaceMe (uid, arg, timeout) {
	return
}

export function execRPC(arg, timeout = 4000) {
	return {
		method: "shell",
		params: {
			command: arg,
			timeout: timeout,
		}
	}
}

export function ubusRPC(path, method, arg, timeout = 2000) {
	return {
		method: "ubus",
		params: {
			path: path,
			action: method,
			msg: arg,
		}
	}
}

export function apiRPC(path, method, arg, timeout = 2000) {
	return {
		method: "api",
		params: {
			path: path,
			action: method,
			msg: arg,
		},
	};
}
export const WAMP = {
	realm: 'default.realm',
	authMethod: 'default',
	defaultAuthId: 'default',

	guestRealm: 'guest.realm',
	guestAuthMethod: 'guest',
	guestAuthId: 'guest',

	subscriberRealm: 'subscriber.realm',
	subscriberAuthMethod: 'subscriber'
}


export const API = {
	commit: apiRPC("/commit", "post", {session:'all'}),
	reboot: apiRPC("/admin/reboot", "post", {}),
	reset: apiRPC("/admin/reset", "post", {}),
	password: apiRPC("/admin/password", "post", {}),
	modereset: apiRPC("/admin/modereset", "post", {}),
	feature: apiRPC("/feature", "get", {}),
	topology: {
		get: apiRPC("/topology", "get", {}),
		reload: apiRPC("/topology/reload", "post", {})
	},
	admin: {
		backup: {
			create: {
				post: apiRPC("/admin/backup/create", "post", {}),
			},
			download: {
				post: apiRPC("/admin/backup/download", "post", {}),
			},
			restore: {
				post: apiRPC("/admin/backup/restore", "post", {}),
			},
		},
	},
	network: {
		commit: apiRPC("/commit", "post", {session:'network'}),
		wanmode: {
			get: apiRPC("/network/wanmode", "get", {}),
			set: apiRPC("/network/wanmode", "put", {})
		},
		lan: {
			get: apiRPC("/network/lan", "get", {}),
			set: apiRPC("/network/lan", "put", {})
		},
		dump: {
			get: apiRPC("/network/dump", "get", {}),
		},
		status: {
			get: apiRPC("/network/status", "get", {}),
		},
		interface: {
			get: apiRPC("/network/interface", "get", {}),
		},
		staticrouting: {
			get: apiRPC("/network/staticrouting", "get", {}),
			put: apiRPC("/network/staticrouting", "put", {}),
			del: apiRPC("/network/staticrouting", "del", {}),
		},
		dsl:{
			line:{
				get: apiRPC("/network/dsl/line", "get", {}),
				put: apiRPC("/network/dsl/line", "put", {}),
			},
			ptm:{
				get: apiRPC("/network/dsl/ptm", "get", {}),
				put: apiRPC("/network/dsl/ptm", "put", {}),
				del: apiRPC("/network/dsl/ptm", "del", {}),
			},
		}
	},
	dhcp: {
		commit: apiRPC("/commit", "post", {session:'dhcp'}),
		get: apiRPC("/dhcp", "get", {}),
		set: apiRPC("/dhcp", "put", {}),
		static: {
			get: apiRPC("/dhcp/static", "get", {}),
			put: apiRPC("/dhcp/static", "put", {}),
			del: apiRPC("/dhcp/static", "del", {}),
			create: {
				post: apiRPC("/dhcp/static/create", "post", {}),
			},
			download: {
				post: apiRPC("/dhcp/static/download", "post", {}),
			},
			restore: {
				post: apiRPC("/dhcp/static/restore", "post", {}),
			},
		},
	},
	wireless: {
		commit: apiRPC("/commit", "post", {session:'wireless'}),
		radio: {
			get: apiRPC("/wifi/radio", "get", {}),
			set: apiRPC("/wifi/radio", "put", {})
		},
		ssid: {
			get: apiRPC("/wifi/ssid", "get", {}),
			set: apiRPC("/wifi/ssid", "put", {})
		},
		global:{
			get: apiRPC("/wifi/global", "get", {}),
			set: apiRPC("/wifi/global", "put", {})
		},
		guest: {
			get: apiRPC("/wifi/ssid/guest/all", "get", {}),
			set: apiRPC("/wifi/ssid/guest", "put", {})
		}
	},
	multiap: {
		commit: apiRPC("/commit", "post", {session:'multiap'}),
		wbdcfg: apiRPC("/multiap/wbdcfg", "get", {}),
		info: apiRPC("/multiap/info", "get", {}),
		map: {
			get: apiRPC("/multiap/map/all", "get", {}),
		},
		fronthaul:  {
			get: apiRPC("/multiap/fronthaul/all", "get", {}),
		},
		backhaul:  {
			get: apiRPC("/multiap/backhaul/all", "get", {}),
		},
		set: apiRPC("/multiap/map", "put", {}),
	},
	usb: {
		get: apiRPC("/usb", "get", {})
	},
	device: {
		info: {
			get: apiRPC("/device/info", "get", {}),
		},
		status: {
			all: apiRPC("/device/status/all", "get", {}),
			cpu: apiRPC("/device/status/cpu", "get", {}),
			mem: apiRPC("/device/status/mem", "get", {}),
			uptime: apiRPC("/device/status/uptime", "get", {}),
		}
	},
	firmware: {
		install : apiRPC("/admin/fwupgrade", "post", {file:'/tmp/firmware.img'})
	},
	ntp:{
		get: apiRPC("/advance/ntp", "get", {}),
		put: apiRPC("/advance/ntp", "put", {}),
	},
	status:{
		ping: apiRPC("/status/ping", "get", {}),
		lan: apiRPC("/status/lan", "get", {}),
		wan: apiRPC("/status/wan", "get", {}),
		wan6: apiRPC("/status/wan6", "get", {}),
		mac: apiRPC("/status/mac", "get", {}),
		arp: {
			get: apiRPC("/status/arp", "get", {}),
			del: apiRPC("/status/arp", "del", {}),
		},
		device: {
			get: apiRPC("/status/device", "get", {}),
		},
		dhcp: apiRPC("/status/dhcp", "get", {}),
		statistics: apiRPC("/status/statistics", "get", {}),
		ports: apiRPC("/status/ports", "get", {}),
	},
	advoptions:{
		get: apiRPC("/advance/options", "get", {}),
		put: apiRPC("/advance/options", "put", {})
	},
	ddns:{
		get: apiRPC("/advance/ddns", "get", {}),
		put: apiRPC("/advance/ddns", "put", {})
	},
	access_control: {
		get: apiRPC("/firewall/access-control", "get", {}),
		put: apiRPC("/firewall/access-control", "put", {})
	},
	portforward:{
		get: apiRPC("/firewall/portforward", "get", {}),
		put: apiRPC("/firewall/portforward", "put", {}),
		del: apiRPC("/firewall/portforward", "del", {}),
	},
	porttrigger:{
		get: apiRPC("/pt/porttrigger", "get", {}),
		put: apiRPC("/pt/porttrigger", "put", {}),
		del: apiRPC("/pt/porttrigger", "del", {}),
		post: apiRPC("/pt/porttrigger", "post", {}),
	},
	dmz: {
		get: apiRPC("/firewall/dmz", "get", {}),
		put: apiRPC("/firewall/dmz", "put", {}),
	},
	upnp: {
		get: apiRPC("/security/upnp", "get", {}),
		put: apiRPC("/security/upnp", "put", {})
	},
	upnplist: {
		get: apiRPC("/security/upnplist", "get", {}),
	},
	parentalcontrol:{
		get: apiRPC("/firewall/parentalcontrol", "get", {}),
		put: apiRPC("/firewall/parentalcontrol", "put", {}),
		del: apiRPC("/firewall/parentalcontrol", "del", {}),
	},
	ipfilter:{
		get: apiRPC("/firewall/ipfilter", "get", {}),
		put: apiRPC("/firewall/ipfilter", "put", {}),
		del: apiRPC("/firewall/ipfilter", "del", {}),
	},
	macfilter:{
		get: apiRPC("/firewall/macfilter", "get", {}),
		put: apiRPC("/firewall/macfilter", "put", {}),
		del: apiRPC("/firewall/macfilter", "del", {}),
	},
	portfilter:{
		get: apiRPC("/firewall/portfilter", "get", {}),
		put: apiRPC("/firewall/portfilter", "put", {}),
		del: apiRPC("/firewall/portfilter", "del", {}),
	},
	wan:{
		get: apiRPC("/wan/interface", "get", {}),
		put: apiRPC("/wan/interface", "put", {}),
		del: apiRPC("/wan/interface", "del", {}),
	},
	cwmp:{
		tr069client: {
			get: apiRPC("/cwmp/tr069client", "get", {}),
			put: apiRPC("/cwmp/tr069client", "put", {}),
		},
		xmpp: {
			get: apiRPC("/cwmp/xmpp", "get", {}),
			put: apiRPC("/cwmp/xmpp", "put", {}),
		},
		stun: {
			get: apiRPC("/cwmp/stun", "get", {}),
			put: apiRPC("/cwmp/stun", "put", {}),
		},
	},
	twamp:{
		get: apiRPC("/advance/twamp", "get", {}),
		put: apiRPC("/advance/twamp", "put", {}),
	},
	voice:{
		status:apiRPC("/voice/status", "get", {}),
	},
	ping:{
		status:apiRPC("/admin/ping", "get", {}),
		start:apiRPC("/admin/ping", "post", {}),
		stop:apiRPC("/admin/ping", "put", {}),
	},
	traceroute:{
		status:apiRPC("/admin/traceroute", "get", {}),
		start:apiRPC("/admin/traceroute", "post", {}),
		stop:apiRPC("/admin/traceroute", "put", {}),
	},
	nslookup:{
		status:apiRPC("/admin/nslookup", "get", {}),
		start:apiRPC("/admin/nslookup", "post", {}),
		stop:apiRPC("/admin/nslookup", "put", {}),
	},
	qos:{
		get: apiRPC("/advance/qos", "get", {}),
		put: apiRPC("/advance/qos", "put", {}),
	},
	clientqos:{
		get: apiRPC("/advance/qos/client", "get", {}),
		put: apiRPC("/advance/qos/client", "put", {}),
		del: apiRPC("/advance/qos/client", "del", {}),
	},
	bandwidthcontrol:{
		get: apiRPC("/advance/bandwidthcontrol", "get", {}),
		put: apiRPC("/advance/bandwidthcontrol", "put", {}),
	},
	share:{
		samba: {
			get: apiRPC("/share/samba", "get", {}),
			put: apiRPC("/share/samba", "put", {}),
			del: apiRPC("/share/samba", "del", {})
		},
		minidlna: {
			get: apiRPC("/share/minidlna", "get", {}),
			put: apiRPC("/share/minidlna", "put", {})
		}
	},
	syslog:{
		get: apiRPC("/admin/syslog", "get", {}),
		put: apiRPC("/admin/syslog", "put", {}),
	},
	portmirroring:{
		get: apiRPC("/advance/portmirroring", "get", {}),
		put: apiRPC("/advance/portmirroring", "put", {}),
	},
	packetcapture:{
		status:apiRPC("/advance/packetcapture", "get", {}),
		start:apiRPC("/advance/packetcapture", "post", {}),
	},
	sessioncontrol:{
		get: apiRPC("/advance/sessioncontrol", "get", {}),
		put: apiRPC("/advance/sessioncontrol", "put", {}),
	},
	firewall:{
		get: apiRPC("/firewall/spi", "get", {}),
		put: apiRPC("/firewall/spi", "put", {}),
	},
	getfile: apiRPC("/admin/file", "get", {}),
	vpn:{
		status: apiRPC("/vpn/status", "get", {}),
		openvpn:{
			get: apiRPC("/vpn/openvpn", "get", {}),
			put: apiRPC("/vpn/openvpn", "put", {}),
			del: apiRPC("/vpn/openvpn", "del", {}),
			cfg: apiRPC("/vpn/openvpn_cfg", "get", {}),
		},
		pptp:{
			get: apiRPC("/vpn/pptp", "get", {}),
			put: apiRPC("/vpn/pptp", "put", {}),
			del: apiRPC("/vpn/pptp", "del", {}),
		},
		ipsec:{
			get: apiRPC("/vpn/ipsec", "get", {}),
			put: apiRPC("/vpn/ipsec", "put", {}),
			del: apiRPC("/vpn/ipsec", "del", {}),
		}
	},

}

export const RPC = {
	ping: ubusRPC('webdevice.ping', 'send'),
	sproxy: {
		reload: ubusRPC('webdevice.service', 'reload', {name:'sproxy'}),
		start: ubusRPC('webdevice.service', 'start', {name:'sproxy'}),
		stop: ubusRPC('webdevice.service', 'stop', {name:'sproxy'}),
		status: ubusRPC('webdevice.service', 'status', {name:'sproxy'})
	},
	sdns: {
		start: ubusRPC('webdevice.service', 'start', {name:'sdns'}),
		stop: ubusRPC('webdevice.service', 'stop', {name:'sdns'}),
		status: ubusRPC('webdevice.service', 'status', {name:'sdns'})
	},
	appblock: {
		reload: ubusRPC('appblock', 'reload')
	},
	network: {
		get: ubusRPC('uci', 'get', {config: 'network'}),
		backup: ubusRPC('uci', 'get', {config: 'network.bak'}),
		add: ubusRPC('uci', 'add', {config: 'network'}),
		set: ubusRPC('uci', 'set', {config: 'network'}),
		delete: ubusRPC('uci', 'delete', {config: 'network'}),
		deviceStatus: ubusRPC('network.device', 'status', {}, 10000),
		list: ubusRPC('network.interface', 'dump', {}, 20000),
		wanIfaceStatus: ubusRPC('network.interface.wan', 'status'),
		renewWanLease: ubusRPC('network.interface.wan', 'renew'),
		releaseWan: ubusRPC('network.interface.wan', 'release'),
		WanUp: ubusRPC('network.interface.wan', 'up'),
		WanDown: ubusRPC('network.interface.wan', 'down'),
		renewWan6Lease: ubusRPC('network.interface.wan6', 'renew'),
		releaseWan6: ubusRPC('network.interface.wan6', 'release'),
		Wan6Up: ubusRPC('network.interface.wan6', 'up'),
		Wan6Down: ubusRPC('network.interface.wan6', 'down'),
		//Use arpCat, not arp.
		arp: ubusRPC('file', 'read', {path: '/proc/net/arp', base64: false}, 30000), // please don't use
		arpCat: execRPC('cat /proc/net/arp'),
		dumparlCat: execRPC('cat /proc/driver/ethsw/dumparl'),
		restart: ubusRPC('webdevice.service', 'restart', {name:'network'}),
		routes: execRPC('/sbin/ip -j route', 30000),
		kaonbr0: execRPC('/sbin/ifconfig br0', 30000),
		fwIpprovMode2:  execRPC('/bin/echo 2 > /data/ipprovmode'),
		fwIpprovMode3:  execRPC('/bin/echo 3 > /data/ipprovmode'),
		fwIpprovMode4:  execRPC('/bin/echo 4 > /data/ipprovmode'),
		// used on docsis
		macstore: replaceMe('utils_file_execute', {path:'/lib/webui/macstore.sh', arguments:[], process_timeout: 10000}),
		conntrackReset: execRPC('/usr/sbin/conntrack -D'),
		client: ubusRPC(
			"file",
			"read",
			{ path: "/tmp/dhcp.leases", base64: false },
			30000
		),
	},
	device: {
		get: ubusRPC('uci', 'get', {config: 'device'}),
		set: ubusRPC('uci', 'set', {config: 'device'})
	},
	igmp: {
		get: ubusRPC('webdevice.igmp_snooping', 'get'),
		set: ubusRPC('webdevice.igmp_snooping', 'set', {})
	},
	multiwan: {
		execute: ubusRPC('webdevice.multiwan', 'execute', {}, 10000)
	},
	netmask: {
		restart: ubusRPC('webdevice.service', 'restart', {name:'dnsmasq'})
	},
	ont: {
		get: ubusRPC('webdevice.ontinfo', 'get', {}, 10000),
		getAuth: ubusRPC('webdevice.ontinfo', 'get_auth'),
		setAuth: ubusRPC('webdevice.ontinfo', 'set_auth', {})
	},
	bridge: {
		macTable: ubusRPC('webdevice.brctl', 'showmacs', {}, 10000),
		status: ubusRPC('webdevice.bridge', 'status'),
		on: ubusRPC('webdevice.bridge', 'on', {}),
		off: ubusRPC('webdevice.bridge', 'off', {}),
		hybrid_bridge: ubusRPC('webdevice.bridge', 'hybrid_bridge', {}),
		/// #if buildOptions.dnaBridgeAndIPv6
		hybridOneOn: ubusRPC('webdevice.bridge', 'hybrid_one_on', {}),
		hybridOneOff: ubusRPC('webdevice.bridge', 'hybrid_one_off', {}),
		hybridTwoOn: ubusRPC('webdevice.bridge', 'hybrid_two_on', {}),
		hybridTwoOff: ubusRPC('webdevice.bridge', 'hybrid_two_off', {}),
		/// #endif
		ipv6On: ubusRPC('webdevice.bridge', 'ipv6_on', {}),
		ipv6Off: ubusRPC('webdevice.bridge', 'ipv6_off', {})
	},
	advoptions: {
		get: ubusRPC('webdevice.advoptions', 'get'),
		set: ubusRPC('webdevice.advoptions', 'set', {}, 10000),
	},
	blockWifiConfigAccess: {
		on: ubusRPC('webdevice.wificfgaccess', 'on'),
		off: ubusRPC('webdevice.wificfgaccess', 'off'),
		status: ubusRPC('webdevice.wificfgaccess', 'status'),
	},
	restoreWifi: {
		start: ubusRPC('webdevice.restorewifi', 'start', {}, 10000),
	},
	dmz: {
		status: ubusRPC('webdevice.dmz', 'status'),
		on: ubusRPC('webdevice.dmz', 'on', {}, 20000),
		off: ubusRPC('webdevice.dmz', 'off', {}, 20000),
		reorder: ubusRPC('webdevice.dmz', 'reorder'),
		interfaces: ubusRPC('webdevice.dmz', 'interfaces', {}, 5000),
		add: ubusRPC('uci', 'add', {config: 'firewall'}),
		set: ubusRPC('uci', 'set', {config: 'firewall'}),
		delete: ubusRPC('uci', 'delete', {config: 'firewall'}),
		get: ubusRPC('uci', 'get', {config: 'firewall'})
	},
	ParentalControls: {
		uci_get: ubusRPC('uci', 'get', {config: 'parental_controls', type: 'device'}),
		uci_set: ubusRPC('uci', 'set', {config: 'parental_controls', type: 'device'}),
		uci_delete: ubusRPC('uci', 'delete', {config: 'parental_controls', type: 'device'}),
		uci_add: ubusRPC('uci', 'add', {config: 'parental_controls', type: 'device'}),
		get:ubusRPC('webdevice.parental_controls', 'get'),
		set:ubusRPC('webdevice.parental_controls', 'set', {}),
		delete:ubusRPC('webdevice.parental_controls', 'delete', {}),
		edit:ubusRPC('webdevice.parental_controls', 'edit', {}),
	},
	webCredential : {
		get: ubusRPC('webdevice.webcredential', 'get'),
		set: ubusRPC('webdevice.webcredential', 'set', {})
	},
	/// #if buildOptions.angelcamPage
	angelcam: {
		uuid: replaceMe('utils_file_read', {path: '/etc/arrow/identity', base64: false}),
		status: replaceMe('utils_file_read', {path: '/tmp/arrow-client', base64: false}),
		reset: replaceMe('utils_file_execute', {path: '/usr/bin/arrow-client-reset', arguments: [], process_timeout: 1000}),
		restart: ubusRPC('webdevice.service', 'restart', {name:'arrow-client'})
	},
	/// #endif
	cmDocsis: {
		status: ubusRPC('modem', 'get_status'),
		info: ubusRPC('modem', 'get_info'),
		downstream: ubusRPC('modem', 'get_downstream'),
		upstream: ubusRPC('modem', 'get_upstream'),
		startup: ubusRPC('modem', 'get_startup'),
		setFreq: ubusRPC('modem', 'set_freq', {})
	},
	wireless: {
		iface: {
			get: ubusRPC('uci', 'get', {config: 'wireless', type: 'wifi-iface'}),
			add: ubusRPC('uci', 'add', {config: 'wireless', type: 'wifi-iface'}),
			set: ubusRPC('uci', 'set', {config: 'wireless', type: 'wifi-iface'}),
			delete: ubusRPC('uci', 'delete', {config: 'wireless', type: 'wifi-iface'}),
		},
		channels: {
			get: ubusRPC('iwinfo', 'freqlist', {}),
			bcmwifi: ubusRPC('bcmwifi', 'channel', {})
		},
		bcmwifi: {
			// [KAON] add bandsteering
			bandsteering: ubusRPC('bcmwifi', 'bandsteering', {}),
			// [KAON] add wifi
			wifi: ubusRPC('bcmwifi', 'wifi', {}),
			// [KAON] add restoreDefault
			restoreDefault: ubusRPC('bcmwifi', 'restoredefault', {}),
			channel: ubusRPC('bcmwifi', 'channels', {}),
			hwmodes: ubusRPC('bcmwifi', 'hwmodes', {}),
			chanspecs: ubusRPC('bcmwifi', 'chanspecs', {}),
			chanspec: ubusRPC('bcmwifi', 'chanspec', {}),
			easyMesh: ubusRPC('bcmwifi', 'easymesh', {}),
			easyMeshAgents: ubusRPC('bcmwifi', 'easymesh_agents', {}, 10000),
			assoc_list: ubusRPC('bcmwifi', 'assoc_list', {}),
		},
		device: {
			get: ubusRPC('uci', 'get', {config: 'wireless', type: 'wifi-device'}),
			add: ubusRPC('uci', 'add', {config: 'wireless', type: 'wifi-device'}),
			set: ubusRPC('uci', 'set', {config: 'wireless', type: 'wifi-device'}),
			delete: ubusRPC('uci', 'delete', {config: 'wireless', type: 'wifi-device'}),
		},
		wps: {
			reportPin: ubusRPC('webdevice.wps', 'wps_pin', {}),
			reportPbc: ubusRPC('webdevice.wps', 'wps_start'),
			reportPbcStop: ubusRPC('webdevice.wps', 'wps_cancel'),
			getApPin: ubusRPC('webdevice.wps', 'wps_ap_pin_get'),
			setApPin: ubusRPC('webdevice.wps', 'wps_ap_pin_set'),
			getStatus: ubusRPC('webdevice.wps', 'wps_get_status', { arguments:['-S'] }),
		},
		global: {
			get: ubusRPC("uci", "get", { config: "wireless", type: "wifi-global" }),
			set: ubusRPC("uci", "set", { config: "wireless", type: "wifi-global" }),
		},
	},
	conndevd: {
		get: replaceMe('conndevd_device_list', null)
	},
	ddns: {
		get: ubusRPC('uci', 'get', {config: 'ddns', type: 'ddns'}),
		set: ubusRPC('uci', 'set', {config: 'ddns', type: 'ddns'}),
		add: ubusRPC('uci', 'add', {config: 'ddns', type: 'ddns'}),
		status: ubusRPC('ddns', 'status', {}),
		info: ubusRPC('ddns', 'info', {}),
		start: ubusRPC('ddns', 'start', {}),
		stop: ubusRPC('ddns', 'stop', {}),
		re_start: execRPC('service ddns restart'),
		restart: ubusRPC('webdevice.service', 'restart', {name:'ddns'}),
		enable_https_from_wan: ubusRPC('ddns', 'enable_https_from_wan'),
		disable_https_from_wan: ubusRPC('ddns', 'disable_https_from_wan'),
	},
	ddnsNew: {
		list: ubusRPC('ddns_scripts', 'get_config'),
		set: ubusRPC('uci', 'set', {config: 'ddns'}),
		add: ubusRPC('uci', 'add', {config: 'ddns'}),
		delete: ubusRPC('uci', 'delete', {config: 'ddns'}),
		getServices: ubusRPC('ddns_scripts', 'services'),
		getServicesIPv6: ubusRPC('ddns_scripts', 'services_ipv6'),
		restart: ubusRPC('ddns_scripts', 'restart'),
		status: ubusRPC('ddns_scripts', 'status', {})
	},
	dhcp: {
		get: ubusRPC('uci', 'get', {config: 'dhcp'}),
		add: ubusRPC('uci', 'add', {config: 'dhcp'}),
		set: ubusRPC('uci', 'set', {config: 'dhcp'}),
		delete: ubusRPC('uci', 'delete', {config: 'dhcp'}),
		lifetime: ubusRPC('dhcp', 'ipv6leases'),
		landnsset: ubusRPC('webdevice.dhcp', 'landnsset', {}),
		get_devices: ubusRPC('webdevice.dhcp', 'get_devices')
	},
	dhcprelay: {
		get: ubusRPC('uci', 'get', {config: 'dhcrelay'}),
		add: ubusRPC('uci', 'add', {config: 'dhcrelay'}),
		set: ubusRPC('uci', 'set', {config: 'dhcrelay'}),
		delete: ubusRPC('uci', 'delete', {config: 'dhcrelay'}),
		set_relay: ubusRPC('webdevice.dhcp', 'dhcp_relay_on'),
		restart: ubusRPC('webdevice.service', 'restart', {name:'dhcrelay4'})
	},
	samba: {
		get: ubusRPC('uci', 'get', {config: 'samba4'}),
		add: ubusRPC('uci', 'add', {config: 'samba4'}),
		set: ubusRPC('uci', 'set', {config: 'samba4'}),
		delete: ubusRPC('uci', 'delete', {config: 'samba4'}),
		set_samba: ubusRPC('webdevice.firewall', 'set_samba', {}),
		set_samba_account: ubusRPC('webdevice.firewall', 'set_samba_account', {}),
		get_samba_account: ubusRPC('webdevice.firewall', 'get_samba_account', {}),
		data: ubusRPC(
			"file",
			"read",
			{ path: "/data/jiwan", base64: false },
			30000
		),
	},
	minidlna: {
		get: ubusRPC('uci', 'get', {config: 'minidlna'}),
		add: ubusRPC('uci', 'add', {config: 'minidlna'}),
		set: ubusRPC('uci', 'set', {config: 'minidlna'}),
		delete: ubusRPC('uci', 'delete', {config: 'minidlna'}),
		reload: ubusRPC('webdevice.service', 'reload', {name:'minidlna'}),
		restart: ubusRPC('webdevice.service', 'restart', {name:'minidlna'})
	},
	dsl: {
		set: ubusRPC('uci', 'set', {config: 'dsl'}),
		get: ubusRPC('uci', 'get', {config: 'dsl'}),
		configure: ubusRPC('dsl', 'configure'),
		status: ubusRPC('dsl', 'get_atm_devices'),
		status_xtm_devices: ubusRPC('dsl', 'status_xtm_devices'),
		get_atm_devices: ubusRPC('dsl', 'get_atm_devices'),
		get_ptm_devices: ubusRPC('dsl', 'get_ptm_devices'),
		set_atm_device: ubusRPC('dsl', 'set_atm_device', {}),
		set_ptm_device: ubusRPC('dsl', 'set_ptm_device', {}),
		remove_atm_device: ubusRPC('dsl', 'remove_atm_device', {}),
		remove_ptm_device: ubusRPC('dsl', 'remove_ptm_device', {}),
	},
	factoryReset: ubusRPC('webdevice.software', 'factory', {}),
	sysupgrade: ubusRPC('webdevice.software', 'sysupgrade', {}, 30000),
	/// #if buildOptions.configBackup
	configBackup: {
		create: ubusRPC('webdevice.software', 'create_backup', {file: '/tmp/config-backup.tar.gz'}, 30000),
		download: ubusRPC('file', 'read', {path: '/tmp/config-backup.tar.gz', base64: true}, 30000),
		// using firmware upload method to upload backup file so thats why path is /tmp/firmware.img
		restore: ubusRPC('webdevice.software', 'restore_backup', {file: '/tmp/firmware.img'}, 30000),
		list: ubusRPC('webdevice.software', 'list_backup_files', {})
	},
	/// #endif
	firewall: {
		get: ubusRPC('uci', 'get', {config: 'firewall', type: 'defaults'}),
		set: ubusRPC('uci', 'set', {config: 'firewall', type: 'defaults'}),
		redirect: {
			get: ubusRPC('uci', 'get', {config: 'firewall', type: 'redirect'}),
			add: ubusRPC('uci', 'add', {config: 'firewall', type: 'redirect'}),
			set: ubusRPC('uci', 'set', {config: 'firewall', type: 'redirect'}),
			delete: ubusRPC('uci', 'delete', {config: 'firewall', type: 'redirect'}),
		},
		rule: {
			get: ubusRPC('uci', 'get', {config: 'firewall', type: 'rule'}),
			add: ubusRPC('uci', 'add', {config: 'firewall', type: 'rule'}),
			set: ubusRPC('uci', 'set', {config: 'firewall', type: 'rule'}),
			order: ubusRPC('uci', 'order', {config: 'firewall', type: 'rule'}),
			delete: ubusRPC('uci', 'delete', {config: 'firewall', type: 'rule'}),
		},
		portForwards: {
			get: ubusRPC('uci', 'get', {config: 'firewall', type: 'redirect'}),
			add: ubusRPC('uci', 'add', {config: 'firewall', type: 'redirect'}),
			set: ubusRPC('uci', 'set', {config: 'firewall', type: 'redirect'}),
			delete: ubusRPC('uci', 'delete', {config: 'firewall', type: 'redirect'})
		},
		portTriggers: {
			get: ubusRPC('uci', 'get', {config: 'brcm_pt', type: 'rule'}),
			add: ubusRPC('uci', 'add', {config: 'brcm_pt', type: 'rule'}),
			set: ubusRPC('uci', 'set', {config: 'brcm_pt', type: 'rule'}),
			delete: ubusRPC('uci', 'delete', {config: 'brcm_pt', type: 'rule'}),
			reload: ubusRPC('brcm_pt', 'reload')
		},
		protection: {
			state: ubusRPC('webdevice.firewall', 'state'),
			disable: ubusRPC('webdevice.firewall', 'disable'),
			low: ubusRPC('webdevice.firewall', 'low', {}),
			medium: ubusRPC('webdevice.firewall', 'medium', {}),
			high: ubusRPC('webdevice.firewall', 'high', {}),
			frag_pkts: ubusRPC('webdevice.firewall', 'frag_pkts', {}),
			syn_flood: ubusRPC('webdevice.firewall', 'syn_flood', {}),
			port_scan: ubusRPC('webdevice.firewall', 'port_scan', {}),
			reorder: ubusRPC('webdevice.firewall', 'reorder')
		},
		zones: ubusRPC('uci', 'get', {config: 'firewall', type: 'zone'}),
		restart: ubusRPC('webdevice.service', 'restart', {name:'firewall'}),
		reload: ubusRPC('webdevice.service', 'reload', {name:'firewall'}),
		LanPortBlockAndException: {
			get: ubusRPC('uci', 'get', {config: 'firewall'}),
			set: ubusRPC('uci', 'set', {config: 'firewall'})
		}
	},
	firmware: {
		version: ubusRPC('webdevice.software', 'get_version', {})
	},
	upnp: {
		get: ubusRPC('uci', 'get', {config: 'upnpd', section: 'config'}),
		set: ubusRPC('uci', 'set', {config: 'upnpd', section: 'config'})
	},
	logread: {
		start: {
			method: "log",
			params: {
				action: "start",
				port: 9000,
			},
		},
		stop: {
			method: "log",
			params: {
				action: "stop",
				port: 9000,
			},
		},
		restart: ubusRPC('webdevice.service', 'restart', {name:'log'}),
		get: ubusRPC('log', 'read', {stream: false, oneshot: true})
	},
	fwLogging: {
		on: ubusRPC('webdevice.fwlogging', 'on'),
		off: ubusRPC('webdevice.fwlogging', 'off'),
		status: ubusRPC('webdevice.fwlogging', 'status'),
	},
	account: {
		syncup: ubusRPC('webdevice.account', 'syncup'),
	},
	blockFragedPackets: {
		on: ubusRPC('webdevice.block_fragmented_packets', 'on'),
		off: ubusRPC('webdevice.block_fragmented_packets', 'off'),
		status: ubusRPC('webdevice.block_fragmented_packets', 'status'),
	},
	lxc: {
		list: ubusRPC('cmd.container', 'list'),
		start: ubusRPC('cmd.container', 'start', {}),
		stop: ubusRPC('cmd.container', 'stop', {})
	},
	diagnostics: {
		ping: ubusRPC('webdevice.diagnostics', 'connectivity', {})
	},
	pingStart: ubusRPC('webdevice.diagnostics', 'ping_start', {}),
	pingStop: ubusRPC('webdevice.diagnostics', 'ping_stop', {}),
	pingStatus: ubusRPC('webdevice.diagnostics', 'ping_status', {}),
	pingResult: ubusRPC('file', 'read', {path: '/tmp/webdevice.ping_result', base64: false}, 30000),
	pingRelay: {
		start: replaceMe('relay_new', {
			server_uid: null,
			client_uid: 'ping_stream',
			process: {
				command: 'ping',
				arguments: [],
				pty: true
			}
		}),
		update: {
			params: {
				uid: 'relay_read',
				buffer_threshold: 1,
				buffer_timeout: null,
				filter: {
					object_name: 'client_uid',
					regex: '^ping_stream$',
				},
				ref: 'pingResponse'
			}
		},
		stop: replaceMe('relay_destroy', {
			server_uid: null,
			client_uid: 'ping_stream'
		})
	},
	tracerouteRelay: {
		start: replaceMe('relay_new', {
			server_uid: null,
			client_uid: 'traceroute_stream',
			process: {
				command: 'traceroute',
				arguments: [],
				pty: true
			}
		}),
		update: {
			params: {
				uid: 'relay_read',
				buffer_threshold: 1,
				buffer_timeout: null,
				filter: {
					object_name: 'client_uid',
					regex: '^traceroute_stream$',
				},
				ref: 'tracerouteResponse'
			}
		},
		stop: replaceMe('relay_destroy', {
			server_uid: null,
			client_uid: 'traceroute_stream'
		})
	},
	staticLeases: {
		get: ubusRPC('sleases', 'get_list')
	},
	statistic: {
		get: ubusRPC('webdevice.statistics', 'get')
	},
	system: {
		get: ubusRPC('uci', 'get', {config: 'system'}),
		set: ubusRPC('uci', 'set', {config: 'system'}),
		config: {
			get: ubusRPC('uci', 'get', {config: 'system', type: 'system'}),
			set: ubusRPC('uci', 'set', {config: 'system', type: 'system'})
		},
		setUserPassword: {
			method: 'password_set',
			params: {}
		},
		restart: ubusRPC('webdevice.service', 'restart', {name:'system'}),
		board: ubusRPC('system', 'board'),
		info: ubusRPC('system', 'info')
	},
	/// #if buildOptions.usb
	usb: {
		list: ubusRPC('webdevice.usb', 'list', {}, 30000),
		mount: ubusRPC('webdevice.usb', 'mount', {}, 5000),
		umount: ubusRPC('webdevice.usb', 'umount', {}, 5000),
		getMpoints: ubusRPC('webdevice.usb', 'list_mpoints', {}, 5000)
	},
	/// #endif
	/// #if buildOptions.cwmpPage
	cwmp: {
		local: {
			get: ubusRPC('uci', 'get', {config: 'easycwmp', type: 'local'}),
			set: ubusRPC('uci', 'set', {config: 'easycwmp', type: 'local'})
		},
		acs: {
			get: ubusRPC('uci', 'get', {config: 'easycwmp', type: 'acs'}),
			set: ubusRPC('uci', 'set', {config: 'easycwmp', type: 'acs'})
		},
		restart: ubusRPC('webdevice.service', 'restart', {name:'easycwmpd'})
	},
	/// #endif

	/// #if buildOptions.internetAccess
	intaccess: {
		get: ubusRPC('uci', 'get', {config: 'intaccess', type: 'device'}, 10000),
		getForGroup: ubusRPC('uci', 'get', {config: 'intaccess', type: 'group'}),

		add: ubusRPC('uci', 'add', {config: 'intaccess', type: 'device'}),
		addForGroup: ubusRPC('uci', 'add', {config: 'intaccess', type: 'group'}),

		set: ubusRPC('uci', 'set', {config: 'intaccess', type: 'device'}),
		setForGroup: ubusRPC('uci', 'set', {config: 'intaccess', type: 'group'}),

		delete: ubusRPC('uci', 'delete', {config: 'intaccess', type: 'device'}),
		deleteForGroup: ubusRPC('uci', 'delete', {config: 'intaccess', type: 'group'}),

		deleteTime: ubusRPC('uci', 'delete', {config: 'intaccess', type: 'device', options: ['time']}),
		deleteTimeForGroup: ubusRPC('uci', 'delete', {config: 'intaccess', type: 'group', options: ['time']}),

		deleteMacForGroup: ubusRPC('uci', 'delete', {config: 'intaccess', type: 'group', options: ['mac']}),
	},
	/// #endif

	/// #if buildOptions.multicastPage
	mcpd: {
		get: ubusRPC('uci', 'get', {config: 'mcpd', type: 'mcpd'}),
		set: ubusRPC('uci', 'set', {config: 'mcpd', type: 'mcpd'}),
	},
	/// #endif

	voice: {
		get: ubusRPC('webdevice.voice', 'get')
	},

	/// #if buildOptions.advancedVoip
	voip: {
		getVoice: ubusRPC('uci', 'get', {config: 'voice', type: 'voice_line'}),
		setVoice: ubusRPC('uci', 'set', {config: 'voice', type: 'voice_line'}),
		deleteVoice: ubusRPC('uci', 'delete', {config: 'voice', type: 'voice_line'}),
		getSip: ubusRPC('uci', 'get', {config: 'voice', type: 'sip_profile'}),
		setSip: ubusRPC('uci', 'set', {config: 'voice', type: 'sip_profile'}),
		deleteSip: ubusRPC('uci', 'delete', {config: 'voice', type: 'sip_profile'}),
		getGlobal: ubusRPC('uci', 'get', {config: 'voice', type: 'sip_params'}),
		setGlobal: ubusRPC('uci', 'set', {config: 'voice', type: 'sip_params'}),
		deleteGlobal: ubusRPC('uci', 'delete', {config: 'voice', type: 'sip_params'}),
		status: ubusRPC('voice.asterisk', 'show_registry', {}, 10000),
		getInterfaces: execRPC('ip -o -4 addr show')
	},
	/// #endif

	exec: {
		wifi: execRPC('/sbin/wifi pending', 15000)
	},
	sentinel: {
		get: ubusRPC('uci', 'get', {config: 'sentinel', type: 'sentinel', section: 'sentinel'}),
		setLang: ubusRPC('uci', 'set', {config: 'sentinel_lang', section: 'sentinel_lang'}),
		wifi: ubusRPC('uci', 'get', {config: 'sentinel', type: 'wifi'}),
	},
	vpn: {
		setup: ubusRPC('vpn', 'setup', {}),
		status: ubusRPC('vpn', 'status'),
		start: ubusRPC('vpn', 'start'),
		stop: ubusRPC('vpn', 'stop'),
		toggle: ubusRPC('vpn', 'toggle'),
		clear: ubusRPC('vpn', 'clear'),
		config: {
			set: ubusRPC('uci', 'set', {config: 'vpn', type: 'ipsec'})
		}
	},
	reboot: ubusRPC('webdevice.software', 'reboot', {}),
	ledon: ubusRPC('webdevice.service', 'led_all_on', {}),
	ledoff: ubusRPC('webdevice.service', 'led_all_off', {}),
	devices: {
		getAll: ubusRPC('mink.db', 'devices_get_all', {}, 10000),
		getByGroup: ubusRPC('mink.db', 'devices_get_by_device_group', {}),
		getWithSpecificFilter: ubusRPC('mink.db', 'devices_get_with_specific_filter', {}),
		getSingle: ubusRPC('mink.db', 'devices_get_single', {}),
		updatePcFilter: ubusRPC('mink.db', 'devices_update_pc_filter', {}),
		delete: ubusRPC('mink.db', 'device_delete', {}),
		groupSet: ubusRPC('mink.db', 'device_group_set', {})
	},
	user: {
		setUsername: ubusRPC('mink.db', 'username_update', {}),
		setPassword: ubusRPC('mink.db', 'password_update', {})
	},
	groups: {
		getAll: ubusRPC('mink.db', 'device_group_get_all'),
		getSingle: ubusRPC('mink.db', 'device_group_get_single', {}),
		add: ubusRPC('mink.db', 'device_group_add', {}),
		update: ubusRPC('mink.db', 'device_group_update', {}),
		delete: ubusRPC('mink.db', 'device_group_delete', {})
	},
	pcFilters: {
		getAll: ubusRPC('mink.db', 'pc_filters_get_all', {}, 5000),
		withSpecificCategory: ubusRPC('mink.db', 'pc_filters_with_specific_category', {}),
		getSingle: ubusRPC('mink.db', 'pc_filters_get_single', {}),
		insert: ubusRPC('mink.db', 'pc_filters_insert', {}),
		insertCopy: ubusRPC('mink.db', 'pc_filters_insert_copy', {}),
		update: ubusRPC('mink.db', 'pc_filters_update', {}),
		deleteForce: ubusRPC('mink.db', 'pc_filters_delete_force', {}),
		categoryMap: {
			getCategories: ubusRPC('mink.db', 'pc_filter_category_map_get_categories', {}),
			getCategoriesNotAdded: ubusRPC('mink.db', 'pc_filter_category_map_get_categories_not_added', {}),
			addCategory: ubusRPC('mink.db', 'pc_filter_category_map_add_category', {}),
			removeCategory: ubusRPC('mink.db', 'pc_filter_category_map_remove_category', {}),
		},

	},
	pcCategories: {
		getAll: ubusRPC('mink.db', 'pc_categories_get_all', {}, 4000),
		insert: ubusRPC('mink.db', 'pc_categories_insert', {}),
		insertCopy: ubusRPC('mink.db', 'pc_categories_insert_copy', {}),
		deleteForce: ubusRPC('mink.db', 'pc_categories_delete_force', {}),
		update: ubusRPC('mink.db', 'pc_categories_update', {}),
		getSimple: ubusRPC('mink.db', 'pc_categories_get_simple', {})
	},
	pcLocalHostCategoryMap: {
		getInCategory: ubusRPC('mink.db', 'pc_local_host_category_map_get_in_category', {}),
		insert: ubusRPC('mink.db', 'pc_local_host_category_map_insert', {}),
		delete: ubusRPC('mink.db', 'pc_local_host_category_map_delete', {}),
		toggle: ubusRPC('mink.db', 'pc_local_host_category_map_toggle', {})
	},
	/// #if buildOptions.configBackup
	alg: {
		get: ubusRPC('webdevice.alg', 'get'),
		set: ubusRPC('webdevice.alg', 'set', {})
	},
	/// #endif
	/// #if buildOptions.networkMulticastPage
	multicast: {
		get: ubusRPC('webdevice.multicast', 'get'),
		set: ubusRPC('webdevice.multicast', 'set', {})
	},
	/// #endif
	/// #if buildOptions.advancedAccessControlPage
	accessControl: {
		get: ubusRPC('webdevice.access_control', 'get'),
		set: ubusRPC('webdevice.access_control', 'set', {}, 5000),
		rule: {
			get: ubusRPC('webdevice.access_control', 'rule_get', {}),
			add: ubusRPC('webdevice.access_control', 'rule_add', {}),
			delete: ubusRPC('webdevice.access_control', 'rule_del', {}),
		}
	},
	/// #endif
	/// #if buildOptions.networkInterfaceGroupingPage
	interfaceGrouping: {
		get: ubusRPC('webdevice.interface_grouping', 'get'),
		add: ubusRPC('webdevice.interface_grouping', 'add', {}),
		delete: ubusRPC('webdevice.interface_grouping', 'del', {}),
	},
	/// #endif
	gtcyber: {
		get: ubusRPC('uci', 'get', {config: 'uhttpd', type: 'gtcyber', section: 'gtcyber'}),
		set: ubusRPC('uci', 'set', {config: 'uhttpd', type: 'gtcyber', section: 'gtcyber'})
	},
	macpt: {
		get: ubusRPC('webdevice.mac_passthrough', 'get'),
		add: ubusRPC('webdevice.mac_passthrough', 'add', {}),
		delete: ubusRPC('webdevice.mac_passthrough', 'delete', {})
	},
	ltedongle: {
		get: ubusRPC('lte_dongle', 'get'),
		get_subscriber: ubusRPC('lte_dongle', 'get_subscriber'),
		get_pin_state: ubusRPC('lte_dongle', 'get_pin_state'),
		enable_pin: ubusRPC('lte_dongle', 'enable_pin'),
		disable_pin: ubusRPC('lte_dongle', 'disable_pin'),
		enter_pin: ubusRPC('lte_dongle', 'enter_pin'),
		change_pin: ubusRPC('lte_dongle', 'change_pin'),
		enter_puk: ubusRPC('lte_dongle', 'enter_puk'),
		set_apnidpwauth: ubusRPC('lte_dongle', 'set_apnidpwauth'),
	},
	date: {
		get: execRPC('date')
	},
	jrpcd: {
		restart: ubusRPC('webdevice.service', 'restart', {name:'jrpcd'})
	},
	sysagentd: {
		restart: ubusRPC('webdevice.service', 'restart', {name:'sysagentd'})
	},
	acl: {
		get: ubusRPC('uci', 'get', {config: 'acl', type: 'whitelist'}),
		set: ubusRPC('uci', 'set', {config: 'acl', type: 'whitelist'}),
		add: ubusRPC('uci', 'add', {config: 'acl', type: 'whitelist'})
	}
}
