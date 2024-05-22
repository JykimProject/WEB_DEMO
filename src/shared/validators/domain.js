import psl from 'psl'

export default function (input) {
	const url = input.replace(/\w+:\/\//, '').split('/')[0]
	if (psl.isValid(url)) {
		return 0
	}
	else {
		return 1
	}
}
