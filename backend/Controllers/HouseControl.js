const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const authzMW = require("../MiddleWares/authMW");
const roleCheck = require('../MiddleWares/roleCheckMW');

const ObjectId = mongoose.Types.ObjectId
const HouseModel = require("../Models/HouseModel");

const validMongoId = require("../utilites/validMongoId");
router.get("/", async (req, res) => {
	const {page, limit} = req.query
	let houses;
	let totalHouses;
	try {
		totalHouses = await HouseModel.estimatedDocumentCount()
		if (page && limit) {
			houses = await HouseModel.find({}).skip((parseInt(page) - 1) * limit).limit(parseInt(limit)).sort({createdAt: -1})
		} else {

			houses = await HouseModel.find({}).sort({createdAt: -1});
		}
		return res.send({houses, totalHouses})

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

router.get("/owner/:id", async (req, res) => {
	try {
		const {id} = req.params
		const isValid = validMongoId(id)
		if (isValid) {
			const house = await HouseModel.find({owner_user_id: new ObjectId(id)});
			return res.send(house)
		} else {
			return res.send({error: true, message: "owner_user_id _id is not valid"})
		}

	} catch (error) {
		console.log("House Control", "GET /owner/:id", error)
		return res.send({error: true, message: "Failed to GET owned houses"})

	}
})

router.post("/", authzMW, roleCheck('owner'), async (req, res) => {
	try {
		const body = req.body
		const owner_user_id = new ObjectId(res.decoded._doc._id)
		body["owner_user_id"] = owner_user_id
		const newHouse = new HouseModel(body);
		const response = await newHouse.save()
		return res.send(response)
	} catch (error) {
		console.log("House Control", "POST /", error)
		return res.send({error: true, message: "Failed to POST a house"})

	}
})

router.put("/:id", authzMW, async (req, res) => {
	try {
		const {id} = req.params
		const body = req.body
		const owner_user_id = new ObjectId(res.decoded._doc._id)
		body["owner_user_id"] = owner_user_id
		const updatedHouse = await HouseModel.updateOne({owner_user_id, _id: id}, body);
		return res.send(updatedHouse)
	} catch (error) {
		console.log("House Control", "PUT /:id", error)
		return res.send({error: true, message: "Failed to POST a house"})

	}

})

router.delete("/:id", authzMW, async (req, res) => {
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

