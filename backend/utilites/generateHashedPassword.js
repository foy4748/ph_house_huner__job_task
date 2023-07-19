const bcrypt = require('bcrypt');

const generateHashedPassword = async (password) => {
	try {
		// Generate a salt to hash the password
		const salt = await bcrypt.genSalt(10);

		// Hash the password with the generated salt
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	} catch (error) {
		// Handle the error
		console.error('Error generating hashed password:', error);
		throw error; // or return an error message
	}
}

module.exports = generateHashedPassword
