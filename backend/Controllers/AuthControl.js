const dotenv = require("dotenv");
dotenv.config();

const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const jwt = require('jsonwebtoken');
const SECRET_JWT = process.env.SECRET_JWT;

const UserModel = require("../Models/UserModel");
const generateHashedPassword = require("../utilites/generateHashedPassword");
const comparePasswords = require("../utilites/comparePasswords");
const authzMW = require("../MiddleWares/authMW");

router.get("/:id", authzMW, async (_, res) => {
	try {
		const user_id = res.decoded._doc._id;
		const user = await UserModel.findOne({_id: new ObjectId(user_id)});
		user._doc.password = null
		res.send(user)
	} catch (error) {
		console.error(error)
		return res.send({error: true, message: "Failed to GET your Informations"})

	}

})

router.post("/register", async (req, res) => {
	const body = req.body;
	try {
		body.password = await generateHashedPassword(body.password)
		const newUser = new UserModel(body);
		const response = await newUser.save();
		response._doc.password = null
		const token = jwt.sign(response, SECRET_JWT);
		response.token = token
		return res.send(response)

	} catch (error) {
		console.error(error)
		if (error.name === "ValidationError") {
			let errors = {};

			Object.keys(error.errors).forEach((key) => {
				errors[key] = error.errors[key].message;
			});

			return res.status(400).send(errors);
		}
		return res.send({error: true, message: "Failed to register new user"})
	}
})

router.post("/login", async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = await UserModel.findOne({email})
		const isMatch = await comparePasswords(password, user.password)
		if (user && isMatch) {
			user._doc.password = null;
			const response = {...user, password: null}
			console.log(response)
			const token = jwt.sign(response, SECRET_JWT);
			response.token = token
			response.password = null
			return res.send(response)

		} else {
			return res.send({error: true, message: "Email/Password didn't match or exists"})

		}
	} catch (error) {
		console.error(error)
		return res.send({error: true, message: "Failed to login user"})

	}
})
module.exports = router
