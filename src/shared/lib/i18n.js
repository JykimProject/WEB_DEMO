export default function Translation (langData, key, params) {
	const value = langData[key]
	let text = Array.isArray(value)
		? value[0]
		: value

	let plural = Array.isArray(value)
		? value[1]
		: null

	const titleCase = val => {
		return val.split(' ')
			.map(w => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ')
	}

	// custom variables
	if (Array.isArray(params)) {
		params.forEach((p, i) => {
			const regex = new RegExp('\\{' + i + '}')

			if (text != null) {
				text = text.replace(regex, p)
			}
			if (plural != null) {
				plural = plural.replace(regex, p)
			}
		})
	}
	else if (typeof params === 'object') {
		Object.keys(params).forEach(p => {
			const regex = new RegExp('\\{' + p + '}')
			const val = params[p]

			if (text != null) {
				text = text.replace(regex, val)
			}
			if (plural != null) {
				plural = plural.replace(regex, val)
			}
		})
	}

	if (text == null) {
		text = key

		if (process.env.NODE_ENV !== 'production') {
			console.warn('Untranslated string: ' + key)
		}
	}
	if (plural == null) {
		plural = key
	}

	this.key = key
	this.str = text
	this.upper = text.toUpperCase()
	this.cap = text.charAt(0).toUpperCase() + text.slice(1)
	this.title = titleCase(text)

	this.plural = plural
	this.pluralUpper = plural.toUpperCase()
	this.pluralCap = plural.charAt(0).toUpperCase() + plural.slice(1)
	this.pluralTitle = titleCase(plural)
}

Translation.prototype.toString = function () {
	return this.str
}
