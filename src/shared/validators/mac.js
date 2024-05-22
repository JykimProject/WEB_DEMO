export default function (input, blacklist = {}) {
	var validUnicastChars = ['0', '2', '4', '6', '8', 'A', 'C', 'E']
	if (/[^0-9A-Fa-f:-]/.test(input)) {
		return 1
	}
	else if (input.length > 17) {
		return 2
	}
	else if (
		!/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/.test(input) ||
		input === '00:00:00:00:00:00' ||
		input.toUpperCase() === 'FF:FF:FF:FF:FF:FF' ||
		input.indexOf('01') === 0 ||
		validUnicastChars.indexOf(input.substr(1, 1).toUpperCase()) === -1
	) {
		return 3
	}
	else if (blacklist.taken) {
		var normalizedTaken = blacklist.taken.map(v => v.toLowerCase())
		var normalizedInput = input.toLowerCase()
		if (normalizedTaken.indexOf(normalizedInput) != -1) {
			return 4
		}
	}

	return 0
}
