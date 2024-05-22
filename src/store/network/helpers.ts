import { ArpFlag, ArpRule } from "@/store/network/types";

function parseFlags(flagsRaw: number): ArpFlag[] {
	let flags = Object.keys(ArpFlag).reduce<ArpFlag[]>((acc, flag): ArpFlag[] =>{
		const parsedFlag = Number(flag)
		if (isNaN(parsedFlag)) {
			return acc
		}

		if (parsedFlag & flagsRaw) {
			return [...acc, parsedFlag]
		}

		return acc
	}, [])

	if (flags.length == 0) {
		flags.push(ArpFlag.INCOMPLETE)
	}

	return flags
}

export function parseArpTable(rawArp: string): ArpRule[] {
	const lines = rawArp.split('\n')
	const firstLine = lines.shift()!.toLowerCase()
	const fields = [
		'ip address',
		'hw type',
		'flags',
		'hw address',
		'mask',
		'device'
	]

	type fieldsLimits = {[key: string]: {start: number, end: number}}

	const {fieldsDecoded}: {fieldsDecoded: fieldsLimits} = fields.reduceRight(({lastIndex, fieldsDecoded}, field) => {
		const start = firstLine.indexOf(field)
		return {
			lastIndex: start,
			fieldsDecoded: {
				[field]: {start, end: lastIndex},
				...fieldsDecoded
			}
		}
	}, { lastIndex: -1, fieldsDecoded: {}})

	return lines.filter(line => line.length).map((line: string): ArpRule => {
		const flagsRawStr = line.slice(fieldsDecoded['flags'].start, fieldsDecoded['flags'].end).trim()
		let flagsRaw = parseInt(flagsRawStr, 16)
		if (isNaN(flagsRaw)) {
			flagsRaw = 0
		}

		const prepareSliceArgs = (start: number, end: number): number[] => {
			let args = [start]
			if (end != -1) {
				args.push(end)
			}

			return args
		}

		return {
			ipAddr: line.slice(...prepareSliceArgs(fieldsDecoded['ip address'].start, fieldsDecoded['ip address'].end)).trim(),
			hwAddr: line.slice(...prepareSliceArgs(fieldsDecoded['hw address'].start, fieldsDecoded['hw address'].end)).trim(),
			interfaceName: line.slice(...prepareSliceArgs(fieldsDecoded['device'].start, fieldsDecoded['device'].end)).trim(),
			flagsRaw,
			flags: parseFlags(flagsRaw)
		}
	})
}
