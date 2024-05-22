import ipaddr from 'ipaddr.js'

export default function ip4netmask (input) {
	try {
		ipaddr.parseCIDR(input)
		return 0
	}
	catch (err) {
		if (ipaddr.isValid(input) && input.split('.').length > 1) {
			return 0
		}
		return 1
	}
}
