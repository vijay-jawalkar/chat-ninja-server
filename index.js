require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const morgan = require("morgan")

const connectToMongoDB =  require("./db/connectToMongoDB")
const userRoutes = require("./routes/user.route.js")
const { errorHandler} = require("./middleware/error.middleware.js")
const bodyParser = require("body-parser")

const openai = require("./routes/openai.routes.js")


//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("Hello World")
})

// routes for user signup and login
app.use("/api/auth", userRoutes)

// routes for open ai request
app.use("/api/geminiai", openai)





app.listen(port, () => {
    connectToMongoDB()
  console.log(`Example app listening on port ${port}`)
})