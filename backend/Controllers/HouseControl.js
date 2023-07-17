const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

const ObjectId = mongoose.Types.ObjectId
const HouseModel = require("../Models/HouseModel");

const validMongoId = require("../utilites/validMongoId");
router.get("/", async (_, res) => {
	try {
		const houses = await HouseModel.find({});
		return res.send(houses)

	} catch (error) {
		console.log("House Control", "GET /", error)
		return res.send({error: true, message: "Failed to GET houses"})
	}
})

router.get("/:id", async (req, res) => {
	try {
		const {id} = req.params
		const isValid = validMongoId(id)
		if (isValid) {
			const house = await HouseModel.findOne({_id: new ObjectId(id)});
			return res.send(house)
		} else {
			return res.send({error: true, message: "House _id is not valid"})
		}

	} catch (error) {
		console.log("House Control", "GET /:id", error)
		return res.send({error: true, message: "Failed to GET a single house"})

	}
})

router.post("/", async (req, res) => {
	try {
		const body = req.body
		console.log(body)
		const newHouse = new HouseModel(body);
		const response = await newHouse.save()
		return res.send(response)
	} catch (error) {
		console.log("House Control", "POST /", error)
		return res.send({error: true, message: "Failed to POST a house"})

	}
})

router.delete("/:id", async (req, res) => {
	try {
		const {id} = req.params
		const isValid = validMongoId(id)
		if (isValid) {
			const deleted = await HouseModel.deleteOne({_id: new ObjectId(id)})
			return res.send(deleted)
		} else {
			return res.send({error: true, message: "House _id is not valid"})
		}
	} catch (error) {

		console.error("House Control", "DELETE /", error)
		return res.send({error: true, message: "Failed to DELETE a house"})
	}
})

module.exports = router

