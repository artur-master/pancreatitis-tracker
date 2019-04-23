/* eslint-disable */

export function dynamicSort(property) {
	let sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	};
}

export function generateRandom() {
	return Math.random().toString().substring(2, 10);
}

export function compare(a,b) {
	if (a.order < b.order)
		return -1;
	if (a.order > b.order)
		return 1;
	return 0;
}

export const validatePhoneNumber = (str) => {
	var re = /^\+?([0-9]{1,2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

	if (str && str.length > 0) {
		return re.test(str);
	} else {
		return false;
	}
}

export const validateEmail = (email) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email && email.length > 0) {
		return re.test(String(email).toLowerCase());
	} else {
		return false;
	}
}

export const isFloat = n => {
    return n === +n && n !== (n|0);
}

export const isInteger = n => {
    return n === +n && n === (n|0);
}

export const count = (s1, letter) => {
	if (typeof (s1) === "string") {
		return ( s1.match( RegExp(letter,'g') ) || [] ).length;
	}

	let convertedString = s1.toString();
	return ( convertedString.match( RegExp(letter,'g') ) || [] ).length;
}

export const allLetter = (inputtxt) => {
	if(/^[a-z ]+$/i.test(inputtxt)) {
		return true;
	}

	return false;
}

export const hasOnlyOneSpace = (text) => {
	if (count(text, '\\ ') < 2) {
		if ((text.indexOf(' ') > 0) && (text.indexOf(' ') < (text.length - 1))) {
			return true;
		}
	}

	return false;
}

export function validateForm(rule, data, unit) {
	let isValidate = true;
	let errorMsg = 'Please enter valid data.';
		
	if (rule) {
		if (!rule.required) {
			if (!data || data === '') {
				return { success: true, msg: ''};
			}
		}

		switch(rule.type) {
			case 'float':
				if (count(data, '\\.') < 2) {
					if (!isNaN(parseFloat(data))) {
						rule.range.forEach((range) => {
							if (
								// range.unit === data.unit &&
								range.unit === unit &&
								(
									range.min > parseFloat(data, 10)
									|| range.max < parseFloat(data, 10)
								)
							) {
								isValidate = false;
								errorMsg = `Valid in (${range.min}, ${range.max})`;
							}
						});
					} else {
						isValidate = false;
					}
				} else {
					isValidate = false;
				}

				break;

			case 'integer':
				if (count(data, '\\.') == 0) {
					if (isInteger(parseInt(data))) {
						rule.range.forEach((range) => {
							if (
								range.unit === unit &&
								(
									range.min > parseFloat(data, 10)
									|| range.max < parseFloat(data, 10)
								)
							) {
								isValidate = false;
								errorMsg = `Valid in (${range.min}, ${range.max})`;
							}
						});
					} else {
						isValidate = false;
					}
				} else {
					isValidate = false;
				}

				break;
			
			case 'email':
				if (!validateEmail(data)) {
					isValidate = false;
				}

				break;
			
			case 'phone':
				if (!validatePhoneNumber(data)) {
					isValidate = false;
				}

				break;

			case 'text':
				if (typeof data !== "string" || data === ""){
					isValidate = false;
				}
				break;
			
			case 'boolean':
				if (typeof data !== "boolean" || data === ""){
					isValidate = false;
				}
				break;
			
			default: break;
		}
	}

	return { success: isValidate, msg: errorMsg };
}

export const validateAccount = (rule, data) => {
	let isValidate = true;

	switch(rule.type) {
		case 'email':
			if (!validateEmail(data)) {
				isValidate = false;
			}

			break;
		
		case 'phone':
			if (!validatePhoneNumber(data)) {
				isValidate = false;
			}

			break;

		case 'text':
			if (typeof data !== "string" || data === ""){
				isValidate = false;
			}
			break;

		case 'name':
			if (data === "" || !allLetter(data) || !hasOnlyOneSpace(data)){
				isValidate = false;
			}
			break;

		default: break;
	}

	return isValidate;
}

export const lbToKgConvert = (lbs) => {
	return lbs / 2.2046;
}

export const inchToCmConvert = (lbs) => {
	return lbs * 2.54;
}

export const fToC = (fahrenheit) => {
	var fTemp = fahrenheit;
	var fToCel = (fTemp - 32) * 5 / 9;
	return fToCel;
}

export const mgDlToMmolL = (value) => {
	var calculated = value * 18.018018;
	return calculated.toFixed(6);
}

export const sodiumConvert = (val) => {
	return val;
}

export const glucoseConvert = (val) => {
	return val * 0.0554994394556615;
}

export const calciumConvert = (val) => {
	return val * 0.25;
}

export const albuminConvert = (val) => {
	return val * 0.1;
}