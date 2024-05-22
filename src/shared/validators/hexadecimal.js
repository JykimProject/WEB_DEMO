export default function hexadecimal(value)
{
	let regexp = /^[0-9a-fA-F]+$/;
  
	if (regexp.test(value))
	{
		return 0;
	}
	else
	{
		return 1;
	}
}
