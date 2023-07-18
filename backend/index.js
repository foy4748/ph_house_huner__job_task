const express = require("express")
const cookieParser = require("cookie-parser")
const app = express();
const cors = require('cors')


// Connecting to DB
require("./dbConnect");

const PORT = process.env.PORT || 3001

const USER = require("./Models/UserModel")

// Exporting Routes
const HouseRoutes = require("./Controllers/HouseControl");
const AuthRoutes = require("./Controllers/AuthControl")

// Using Middlewares

app.use(cors({
	origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
	credentials: true,
	methods: ["GET", "POST"]
}));
app.use(express.json())

const cookieOptions = {
	sameSite: 'none',
	secure: true,
	// Other cookie options if needed
};
app.use(cookieParser(null, cookieOptions))

// Including Routes
app.use("/house", HouseRoutes)
app.use("/auth", AuthRoutes)

app.get("/", (req, res) => {
	res.cookie("user1", JSON.stringify({test: "Test"}), {sameSite: 'none'}).end()
})

app.post("/", async (req, res) => {
	// const user1Obj = {
	// 	full_name: "Faisal Rahman",
	// 	email: "faisaljfcl@gmail.com",
	// 	phone_number: "01717111236",
	// 	password: "kjdfll;adsf",
	// 	role: "owner"

	// }
	const user1Obj = req.body
	const user1 = new USER(user1Obj);
	const response = await user1.save();
})

app.get("/test", (req, res) => {
	res.send({})
})


app.listen(PORT, () => console.log(`Server running at ${PORT}`))
