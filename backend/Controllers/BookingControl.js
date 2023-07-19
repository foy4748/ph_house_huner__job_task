const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const authzMW = require("../MiddleWares/authMW");
const roleCheck = require("../MiddleWares/roleCheckMW")

const ObjectId = mongoose.Types.ObjectId
const UserModel = require("../Models/UserModel");
const HouseModel = require("../Models/HouseModel");

router.post("/", authzMW, roleCheck("renter"), async (req, res) => {
	const {user_id, house_id} = req.body
	try {
		const user = await UserModel.findOne({_id: new ObjectId(user_id)})
		if (user.rented_houses.length < 2) {

			user.rented_houses.push(new ObjectId(house_id))
			const updatedUser = await UserModel.updateOne({_id: new ObjectId(user_id)}, user)
			delete updatedUser['password']
			return res.send({message: "Updating", updatedUser})
		}
		else {
			return res.send({error: true, message: "Max Limit 2 exceeded"})
		}
	} catch (error) {
		console.error("Booking Control", "POST /", error)
		return res.send({error: true, message: "Something Went Wrong"})
	}
})

module.exports = router
