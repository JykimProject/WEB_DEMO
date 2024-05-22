export default function dhcpRange (input, start, limit, netmask) {
	const splitNetmask = netmask.split('.')

	const oct1 = Number(splitNetmask[0])
	const oct2 = Number(splitNetmask[1])
	const oct3 = Number(splitNetmask[2])
	const oct4 = Number(splitNetmask[3])
	let maxRange = 1

	if (oct1 < 255) {
		maxRange *= (256 - oct1)
	}
	if (oct2 < 255) {
		maxRange *= (256 - oct2)
	}
	if (oct3 < 255) {
		maxRange *= (256 - oct3)
	}
	if (oct4 < 255) {
		maxRange *= (256 - oct4)
	}

	// reserved
	maxRange = maxRange - 2

	if (start + limit > maxRange) {
		return 1
	}
	return 0
}