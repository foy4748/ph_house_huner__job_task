// Role Checking Middleware
const roleCheck = (role) => {
	return async (req, res, next) => {
		if (res.decoded._doc.role == role) {
			next();
		} else {
			res
				.status(403)
				.send({error: true, message: "Auth-z failed. Wrong Role"})
				.end();
		}
	};
};

module.exports = roleCheck;
