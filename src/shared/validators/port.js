export default function (input) {
	if (/^\d+$/.test(input) && input > 0 && input < 65536) {
		return 0
	}
	return 1
}
