const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

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
		unique: true
	},
	phone_number: {
		type: String,
		unique: true,
		validate: {
			validator: function (v) {
				const re = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
				return (!v || !v.trim().length || re.test(v))
			},
			message: 'Only Valid mobile no. from Bangladesh is allowed'
		},
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["owner", "renter"],
		require: true
	},
	rented_houses: [{type: ObjectId, ref: 'House'}]
};

const User_ModelOptions = {
	timestamps: true,
};

const User_Schema = mongoose.Schema(User_Obj, User_ModelOptions);

const User_Model = mongoose.model("User", User_Schema);

module.exports = User_Model;
