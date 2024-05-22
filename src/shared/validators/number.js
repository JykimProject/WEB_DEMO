export default function number (input, min, max) {
	if (!/^-?\d+$/.test(input)) {
		return 1
	}
	if (!isNaN(min) && parseInt(input) < min) {
		return 2
	}
	if (!isNaN(max) && parseInt(input) > max) {
		return 3
	}
	return 0
}
