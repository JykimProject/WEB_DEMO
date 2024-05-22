export default function numberLetter (input) {
	if (/[^A-Za-z0-9]+/.test(input)) {
		return 1
	}
	return 0
}

