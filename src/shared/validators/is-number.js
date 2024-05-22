export default function isNumber (input) {
	if (!/^-?\d+$/.test(input)) {
        return 1;
    }
	return 0
}
