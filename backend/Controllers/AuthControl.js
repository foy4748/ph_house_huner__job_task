const dotenv = require("dotenv");
dotenv.config();

const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

const jwt = require('jsonwebtoken');
const SECRET_JWT = process.env.SECRET_JWT;

const UserModel = require("../Models/UserModel");

router.post("/register", async (req, res) => {
	const body = req.body;
	try {
		const newUser = new UserModel(body);
		const _response = await newUser.save();
		const token = jwt.sign({foo: 'bar'}, SECRET_JWT);
		const response = {..._response, token, password: null}
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
module.exports = router
