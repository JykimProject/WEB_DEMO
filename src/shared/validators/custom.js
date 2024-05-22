export default function custom (input, errorCode, rule) {
	return typeof rule === 'function'
		? (rule(input) ? 0 : errorCode)
		: (rule ? 0 : errorCode)
}
