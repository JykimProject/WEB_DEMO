export default function (input) {
	var bytes = encodeURI (input).split (/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1

	if (bytes < 1) {
		return 1
	}
	if (bytes > 32) {
		return 2
	}
	if (!isASCII(input)) {
		return 3
	}
	return 0
}

function isASCII(str) {
	/* eslint-disable-next-line no-control-regex */
	return /^[\x00-\x7F]*$/.test(str)
}
