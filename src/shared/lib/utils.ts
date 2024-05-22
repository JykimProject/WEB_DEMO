export function take(obj: object, ...keys: string[]): object {
	return Object.fromEntries(
		Object.entries(obj).filter(([k]) => keys.includes(k))
	)
}
