export default function portRange (input) {
	if (/[^0-9 -]+/.test(input)) {
		return 1
	}
	const MAX = 65536
	const MIN = 0
	const groups = input.replace(/\s+/g, ' ').split(' ')

	for (let group of groups) {
		const range = input.split('-')
		if (range.length > 2) {
			return 1
		}

		const lower = parseInt(range[0])

		// single port
		if (isNaN(lower)) {
			return 1
		}
		let isLowerInRange = lower < MAX && lower > MIN
		if (!isLowerInRange) {
			return 1
		}

		if (range.length === 1) {
			continue
		}

		// range
		const upper = parseInt(range[1])

		if (isNaN(upper)) {
			return 1
		}
		let isUpperInRange = upper < MAX && upper > MIN
		if (!isUpperInRange) {
			return 1
		}
		let isUpperBigger = upper > lower
		if (!isUpperBigger) {
			return 2
		}
	}

	return 0
}
