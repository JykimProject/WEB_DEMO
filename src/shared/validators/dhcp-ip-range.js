import ipaddr from 'ipaddr.js'
import { inet_aton } from '@/shared/functions'

export default function dhcpIpRange (input, start, end, netmask, ip) {
	try {
		const addr = ipaddr.parse(ip)
		const startParsed = ipaddr.parse(start)
		const endParsed = ipaddr.parse(end)
		const cidr = ipaddr.IPv4.parse(netmask).prefixLengthFromSubnetMask()

		if (!addr.match(startParsed, cidr)) {
			return 1
		}

		if (!addr.match(endParsed, cidr)) {
			return 2
		}

		if (inet_aton(startParsed.octets.join('.')) > inet_aton(endParsed.octets.join('.'))) {
			return 3
		}

		if (inet_aton(addr.octets.join('.')) >= inet_aton(startParsed.octets.join('.'))
						&& inet_aton(addr.octets.join('.')) <= inet_aton(endParsed.octets.join('.'))) {
			return 4
		}
	}
	// eslint-disable-next-line no-empty
	catch {}
	return 0
}
