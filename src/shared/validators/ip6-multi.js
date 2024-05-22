import ipaddr from 'ipaddr.js'

export default function ip6 (input) {
	const split = input.split(' ')
	for (const index in split) {
		const item = split[index]
		if (ipaddr.IPv6.isValid(item)) continue
		try  {
			ipaddr.parseCIDR(item)
			continue
		}
		catch (err) {
			return 1
		}
	}
	return 0
}
