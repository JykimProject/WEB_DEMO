import ipaddr from 'ipaddr.js'

export default function ip6 (input) {
	if (!input) return 0
	if (ipaddr.IPv6.isValid(input)) return Number(!ipaddr.IPv6.isValid(input))
	try  {
		ipaddr.parseCIDR(input)
		return 0
	}
	catch (err) {
		return 1
	}
}
