export default function subnet (input) {
	var expression = /^(((128|192|224|240|248|252|254)\.0+\.0+\.0+)|(255\.(0|128|192|224|240|248|252|254|255)\.0+\.0+)|(255\.255\.(0|128|192|224|240|248|252|254|255)\.0+)|(255\.255\.255\.(0|128|192|224|240|248|252)))$/;
	if (expression.test(input))
	{
		return false
	}
	
	return true
}
