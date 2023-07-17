const mongoose = require("mongoose");

const House_Obj = {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
		required: true,
		trim: true,
	},
	bedrooms: {
		type: Number,
		required: true,
	},
	bathrooms: {
		type: Number,
		required: true
	},
	phone_number: {
		type: String,
		validate: {
			validator: function (v) {
				const re = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
				return (!v || !v.trim().length || re.text(v))
			},
			message: 'Only Valid mobile no. from Bangladesh is allowed'
		},
		required: true
	},
	room_size: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	rent_per_month: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true,
		maxLength: [2000, "Can't be longer than 2000 characters"]
	}
};

const House_ModelOptions = {
	timestamps: true,
};

const House_Schema = mongoose.Schema(House_Obj, House_ModelOptions);

const House_Model = mongoose.model("House", House_Schema);

module.exports = House_Model;

