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
		user.rented_houses.push(new ObjectId(house_id))
		console.log(user)
		const updatedUser = await UserModel.updateOne({_id: new ObjectId(user_id)}, user)
		delete updatedUser['password']
		return res.send({message: "Updating", updatedUser})
	} catch (error) {
		console.error(error)
		return res.send({error: true, message: "Something Went Wrong"})
	}
})

module.exports = router
