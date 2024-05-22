export default function (mac) {
	function dec2bin (dec) {
		return '00000000'.substring(0, 8 - dec.toString(2).length) + dec.toString(2)
	}

	const macArr = mac.split('.').map(x => parseInt(x))

	if (mac !== macArr.join('.')) return 2
	let result = ''

	if (macArr.length !== 4) {
		return 2
	}

	macArr.forEach((x) => {
		result += dec2bin(x)
	})

	if (result === result.split('').sort().reverse().join('')) {
		return 0
	}

	return 1
}
