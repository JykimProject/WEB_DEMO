export default function (input, blacklist) {
	if (blacklist.subnet) {
		// test subnet here
	}

	if (blacklist.routerIp && input === blacklist.routerIp) {
		return 2
	}

	if (blacklist.list) {
		const disallowed = blacklist.list.some(function (ip) {
			return ip === input
		})

		if (disallowed) {
			return 3
		}
	}

	return 0
}
