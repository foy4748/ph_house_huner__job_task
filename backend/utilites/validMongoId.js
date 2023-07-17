const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

function validMongoId(id) {
	const isValid = ObjectId.isValid(id)
	return isValid
}

module.exports = validMongoId
