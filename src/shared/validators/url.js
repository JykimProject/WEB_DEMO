export default function (input) {
	try {
	  new URL(input);
	  return 0;
	} catch (e) {
	  return 1;
	}
  }
