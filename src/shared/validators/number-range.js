export default function number (input, input2) {
	if (Math.abs(parseInt(input) - parseInt(input2)) > 1000) {
		return 1
	}
	return 0
}
