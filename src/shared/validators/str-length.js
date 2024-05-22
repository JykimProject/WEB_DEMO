export default function strLength (input, min, max) {
	if (!isNaN(min) && input.length < min) {
		return 1
	}
	if (!isNaN(max) && input.length > max) {
		return 2
	}
	return 0
}
