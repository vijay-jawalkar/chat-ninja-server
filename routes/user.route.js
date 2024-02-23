const express = require("express")
const router = express.Router();
const {signup, login, logout} = require("../controllers/user.controller.js")
// const {protect} = require("../middleware/auth.middleware.js")




router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

module.exports = router;