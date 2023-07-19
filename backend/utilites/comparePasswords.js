const bcrypt = require('bcrypt');

async function comparePasswords(plainPassword, hashedPassword) {
	try {
		// Compare the plain password with the hashed password
		const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

		return isMatch;
	} catch (error) {
		// Handle the error
		console.error('Error comparing passwords:', error);
		throw error; // or return an error message
	}
}

module.exports = comparePasswords
