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
const BookingRoutes = require('./Controllers/BookingControl')

// Using Middlewares

app.use(cors({
	origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
	credentials: true,
	methods: ["GET", "POST", "DELETE", "PUT"]
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
app.use("/booking", BookingRoutes)

app.get("/", (req, res) => {
	return res.send({error: false, message: "Server is UP and Running"})
})

app.get("/test", (req, res) => {
	return res.send({})
})


app.listen(PORT, () => console.log(`Server running at ${PORT}`))
