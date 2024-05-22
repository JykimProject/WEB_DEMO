import ipaddr from 'ipaddr.js'

export default function ip4 (input, ranges) {
	var octets = input.split('.')
	var octetsValid = octets.every(function (octet) {
		if (octet === '') {
			return true
		}
		if (octet[0] === '0' && parseInt(octet) !== 0) {
			return false
		}
		octet = parseInt(octet)
		return octet >= 0 && octet <= 255
	})

	if (typeof ranges === 'undefined') {
		ranges = ['-unspecified', '-broadcast']
	}

	if (!octetsValid) {
		return 1
	}
	if (octets.length !== 4) {
		return 2
	}

	if (!ipaddr.IPv4.isValid(input)) {
		return 3
	}

	if (ranges) {
		var error = 0
		var inputRange = ipaddr.IPv4.parse(input).range()

		ranges.forEach(function (range) {
			if (error) {
				return
			}
			if (range.indexOf('-') === 0 && inputRange === range.slice(1)) {
				error = 3
			}
		})

		if (!error) {
			var filtered = ranges.filter(function (range) {
				return range.indexOf('-') !== 0
			})
			if (filtered.length && filtered.indexOf(inputRange) === -1) {
				return 3
			}
		}

		return error
	}

	return 0
}
