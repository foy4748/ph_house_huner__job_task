const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT

/* JWT Token Check Middleware */
const authzMW = async (req, res, next) => {
	const {authtoken} = req.headers
	try {
		const decoded = jwt.verify(authtoken, SECRET_JWT);
		if (decoded) {
			res.decoded = {};
			res.decoded = decoded;
			next();
		} else {
			res
				.status(403)
				.send({error: true, message: "Unauthorized action attempted"})
				.end();
		}
	} catch (error) {
		console.error(error.message);
		res
			.status(403)
			.send({error: true, message: "Auth-z failed. Invalid Token"})
			.end();
	}
}

module.exports = authzMW
