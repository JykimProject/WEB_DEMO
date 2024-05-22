export default function ip6ifaceid (val) 
{
	let regexp = /^(([0-9a-fA-F]{1,4}:){3,3}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,3}:|([0-9a-fA-F]{1,4}:){1,2}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,1}(:[0-9a-fA-F]{1,4}){1,2}|:((:[0-9a-fA-F]{1,4}){1,3}|:))$/
	if ( val === 'eui64' || val === 'random')
		return 0
	else if ( regexp.test(val))
		return 0
	else
		return 1
}
