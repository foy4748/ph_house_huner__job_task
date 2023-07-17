const express = require("express")
const cookieParser = require("cookie-parser")
const app = express();
const cors = require('cors')

// Connecting to DB
require("./dbConnect");

const PORT = process.env.PORT || 3001

const USER = require("./Models/UserModel")

// Using Middlewares

app.use(cors({
	origin: "*",
	credentials: true,
	methods: ["GET", "POST"]
}));
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
	console.log(req.headers)
	res.send({error: false, message: "Server is UP and running"})
})

app.post("/", async (req, res) => {
	// const user1Obj = {
	// 	full_name: "Faisal Rahman",
	// 	email: "faisaljfcl@gmail.com",
	// 	phone_number: "01717111236",
	// 	password: "kjdfll;adsf",
	// 	role: "owner"

	// }
	console.log("Response Body", req.body)
	const user1Obj = req.body
	const user1 = new USER(user1Obj);
	const response = await user1.save();
	res.cookie("user1", JSON.stringify(response)).send(response)
})

app.get("/test", (req, res) => {
	console.log(req.headers.user1)
	res.send({})
})


app.listen(PORT, () => console.log(`Server running at ${PORT}`))
