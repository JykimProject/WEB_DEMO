export default function (input) {
	// initialize somehow
	const maxHours = 72
    
	var error = 0
    

	//split into groups of digits and letters
	var parts = input.split(/(\d+)/).filter(Boolean)

	//the input should have exactly two parts
	if (parts.length !== 2) {
		error = 1
		return error
	}
    
	//the first one is number
	if (isNaN(parseInt(parts[0]))) {
		error = 2
		return error
	}

	//the second one is a single character - unit (either s, m or h)
	if (parts[1] !== 's' && parts[1] !== 'm' && parts[1] !== 'h') {
		error = 3
		return error
	}

	//??allow spaces - in that case the trimmed value of the second part should be examined??


	//check if value is >= 2m
	switch (parts[1]) {
	case 's':
		if (parts[0] < 120) {
			error = 4
			return error
		}
		else
			break
	case 'm':
		if (parts[0] < 2) {
			error = 4
			return error
		}
		else
			break
    //assuming decimal numbers are not allowed, hours do not have to be checked
	}


	//check if value is <= maxHours
	switch (parts[1]) {
	case 's':
		if (parts[0] > 60 * 60 * maxHours) {
			error = 5
			return error
		}
		else
			break
	case 'm':
		if (parts[0] > 60 * maxHours) {
			error = 5
			return error
		}
		else
			break
	case 'h':
		if (parts[0] >  maxHours) {
			error = 5
			return error
		}
		else
			break
	}

	return error
}
