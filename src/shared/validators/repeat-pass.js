export default function wifiPass (input, params) {
	return input !== params.repeatPass ? 1 : 0
}