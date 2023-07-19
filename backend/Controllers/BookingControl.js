const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const authzMW = require("../MiddleWares/authMW");
const roleCheck = require("../MiddleWares/roleCheckMW")

const ObjectId = mongoose.Types.ObjectId
const UserModel = require("../Models/UserModel");
//const HouseModel = require("../Models/HouseModel");

router.get("/", authzMW, roleCheck("renter"), async (_, res) => {
	const user_id = res.decoded._doc._id
	try {
		const user = await UserModel.findOne({_id: new ObjectId(user_id)}).populate('rented_houses').exec()
		const {rented_houses} = user
		return res.send(rented_houses)
	} catch (error) {
		console.error("Booking Control", "GET /", error)
		return res.send({error: true, message: "Something Went Wrong"})
	}

})

router.post("/", authzMW, roleCheck("renter"), async (req, res) => {
	const {house_id} = req.body
	const user_id = res.decoded._doc._id
	try {
		const user = await UserModel.findOne({_id: new ObjectId(user_id)})

		// Checking If the user already booked this house
		if (user.rented_houses.includes(house_id)) {
			return res.send({error: true, message: "Already rented"})
		}

		// Checking Max Booking Limit
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

router.delete("/:id", authzMW, roleCheck('renter'), async (req, res) => {
	const user_id = res.decoded._doc._id
	const {id: house_id} = req.params
	try {
		const user = await UserModel.findOne({_id: new ObjectId(user_id)})
		user.rented_houses = user.rented_houses.filter((house) => !house.equals(house_id))
		const updatedUser = await UserModel.updateOne({_id: new ObjectId(user_id)}, user);
		return res.send(updatedUser)
	} catch (error) {
		console.error("Booking Control", "DELETE /", error)
		return res.send({error: true, message: "Something Went Wrong"})
	}


})

module.exports = router
