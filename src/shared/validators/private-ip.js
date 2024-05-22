import ipaddr from 'ipaddr.js'

export default function (input) {
	return Number(ipaddr.parse(input).range() !== 'private')
}
