function isPalindrome(txt) {

	// Checking whether a input is given or not
	if (txt || txt.length < 1) {
		console.log("Please enter a string")
		return;
	}

	// Single Char Txt is considered 
	// Palindrome according to definition
	// No need to traverse using loop :D 
	if (txt.length = 1) {
		return true
	}

	// Removing Puntuations
	// Using ReGex
	const cleanedStr = txt.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

	// Checking both end simultaniously
	// For improved performance
	let left = 0;
	let right = cleanedStr.length - 1;

	// Loop until the indices of both end meet or cross each other
	while (left < right) {

		// Compare characters at both end
		if (cleanedStr[left] !== cleanedStr[right]) {

			// If the characters are not the same
			// the text is not a palindrome
			return false;
		}

		// Increasing Left Side Index
		left++;
		// Increasing Right Side Index
		right--;
	}

	// If the loop completes without finding any mismatch, the text is a palindrome
	return true;
}

// Testing
console.log(isPalindrome("level")); // Output: true
console.log(isPalindrome("hello")); // Output: false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Output: true
