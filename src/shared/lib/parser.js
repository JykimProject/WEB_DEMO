/**
 * Parse contains various functions
 * to parse response from device
 * to transpile it into desired structure
 */

export function parse ({ requestData }, { dict }) {
	/*
	if (requestData.params.uid === 'utils_file_read') {
		// Network.ARP
		if (requestData.params.arg.path === '/proc/net/arp') {
			return parseArp({dict, list})
		}
	}

	if (requestData.params.uid === 'utils_file_execute') {
		/// #if buildOptions.quantennaWifiPage
		if (requestData.params.arg.path === '/usr/bin/qtn-get') {
			let obj = {}

			try {
				obj = JSON.parse(dict.stdout)
			}
			// eslint-disable-next-line no-empty
			catch {}

			return {
				dict: obj,
				list
			}
		}
		/// #endif
	}
	*/

	return {dict}
}

function parseArp ({ dict, list }) {
	if (typeof dict === 'string') {
		list = dict.trim().split('\n').map(line => {
			const fields = line.split(/\s{2,}/)
			return {
				IPaddress: fields[0],
				hwaddress: fields[3]
			}
		}).slice(1) // remove heading
	}

	return {dict, list}
}
