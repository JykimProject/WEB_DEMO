import ipaddr from 'ipaddr.js'

export default function (input) {
	if (!ipaddr.IPv4.isValid(input)) {
		return 1
	}
	if (ipaddr.IPv4.parse(input).prefixLengthFromSubnetMask() == null) {
		return 1
	}
	if (prefixLengthFromSubnetMaskDoesNotCatchZero(input)) {
		return 1
	}
	return 0
}

function prefixLengthFromSubnetMaskDoesNotCatchZero(input) {
	return input === "0"
}
