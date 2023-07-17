const mongoose = require("mongoose");

const User_Obj = {
	full_name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	phone_number: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["owner", "renter"],
		default: "user",
	},
};

const User_ModelOptions = {
	timestamps: true,
};

const User_Schema = mongoose.Schema(User_Obj, User_ModelOptions);

const User_Model = mongoose.model("User", User_Schema);

module.exports = User_Model;
