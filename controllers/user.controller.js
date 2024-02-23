const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");
const errorResponse = require("../utils/error.response.js")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie.js")




 const signup = async (req, res, next) => {
	
  try{
   const { name, username, email, password } = req.body;

   const userExists = await User.findOne({ email })

   if (userExists) {
    return res.status(400).json({ error: "Username already exists" });
  }

   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(password, salt);

 const user = await User.create({
  name,
  username,
  email,
  password: hashPassword
 })

 if(user){

  generateTokenAndSetCookie(user._id, res)

  res.status(201).json({
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password
  })
 }else{
  res.status(400).json({ error: "Invalid user data" });
 }

 

  }catch(error){
    console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
};


const login = asyncHandler(async (req, res) => {


  try{
    const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);
    
  res.status(201).json({
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password
  })

  }catch(error){
    console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
});

const logout = asyncHandler(  (req, res) => {
  try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
})

module.exports = {  signup, login, logout };