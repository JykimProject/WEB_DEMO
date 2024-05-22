import ipaddr from 'ipaddr.js'

export default function ip4netmask (input) {
	const split = input.split(' ')

	for (const index in split) {
		const item = split[index]
		try {
			ipaddr.parseCIDR(item)
			continue
		}
		catch (err) {
			// we need this check for ip addresses without CIDR
			if (ipaddr.isValid(item) && item.split('.').length > 1) {
				continue
			}
			return 1
		}
	}
	return 0
}
