const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const Booking_Obj = {
	house_id: {
		type: ObjectId,
		required: true
	},
	renter_id: {
		type: ObjectId,
		required: true
	},
	renter_phone_number: {
		type: String,
		required: true,
		unique: false,
		validate: {
			validator: function (v) {
				const re = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
				return (!v || !v.trim().length || re.test(v))
			},
			message: 'Only Valid mobile no. from Bangladesh is allowed'
		},
	},
};

const Booking_ModelOptions = {
	timestamps: true,
};

const Booking_Schema = mongoose.Schema(Booking_Obj, Booking_ModelOptions);

const Booking_Model = mongoose.model("Booking", Booking_Schema);

module.exports = Booking_Model;

