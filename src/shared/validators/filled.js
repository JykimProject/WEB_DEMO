// https://github.com/vuejs/vue-validator/blob/dev/src/validators.js (modified)
export default function filled (val) {
	if (typeof val === 'number' || typeof val === 'function') {
		return 0
	}
	else if (typeof val === 'boolean') {
		return Number(!val)
	}
	else if (typeof val === 'string' || Array.isArray(val)) {
		return val.length > 0 ? 0 : 1
	}
	else if (val !== null && typeof val === 'object') {
		if (val instanceof Date) {
			return val.toString().length ? 0 : 1
		}
		return Object.keys(val).length > 0 ? 0 : 1
	}
	else if (val === null || val === undefined) {
		return 1
	}
}
