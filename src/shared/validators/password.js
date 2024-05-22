export default function validatePassword(password, trig) {
	// Set up the regex for each character class
	const uppercaseRegex = /[A-Z]/;
	const lowercaseRegex = /[a-z]/;
	const numberRegex = /[0-9]/;
	const specialCharRegex = /[!-/:-@[-`{-~]/;

	for (let l = 0; l < password.length; l++) {
		let incheck = false;
		let element = password[l]
		if (uppercaseRegex.test(element)) {
			incheck = true;
		}
		if (lowercaseRegex.test(element)) {
			incheck = true;
		}
		if (numberRegex.test(element)) {
			incheck = true;
		}
		if (specialCharRegex.test(element)) {
			incheck = true;
		}
		if (!incheck) {
			return -2;
		}
	}

	// Check if the password contains characters from at least two character classes
	let classesFound = 0;
	if (uppercaseRegex.test(password)) {
		classesFound++;
	}
	if (lowercaseRegex.test(password)) {
		classesFound++;
	}
	if (numberRegex.test(password)) {
		classesFound++;
	}
	if (specialCharRegex.test(password)) {
		classesFound++;
	}

	if(trig){
		if (classesFound < 4) {
			return -1;
		}
	}
	else {
		if (classesFound < 2) {
			return -1;
		}
	}

	// If all checks pass, the password is valid
	return 0;
}
