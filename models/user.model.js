const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
   name : {
    type: String,
    required: true
   },
   username : {
    type: String,
    required: true,
    unique: true
   },
   
   email: {
   type: String,
   required: true
   },
   password : {
    type: String,
    required: true,
    minlength: 6
   },
   customerId:{
   type: String,
   default: ""
   },
   subscription:{
    type: String,
    default: ""
    }
}, {timestamps: true})

//hashed password
// userSchema.pre("save", async (next) => {

//   //update
//   if(!this.isModified("password")){
//     next()
//   }

//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt);
//   next()
// })

//match password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

  //sign token
  // userSchema.methods.getSignedToken = function(res){
  //   const accessToken = jwt.sign(
  //     {id: this._id},
  //     process.env.JWT_SECRET,
  //     { expiresIn: "15min" }
  //   )

  //   const refreshToken = jwt.sign(
  //     {id: this._id},
  //     process.env.JWT_REFRESH_TOKEN,
  //     { expiresIn: "15d"}
  //   )

  //   res.cookie("refreshToken", `${refreshToken}`, {
  //     maxAge: 86400 * 7000,
  //     httpOnly: true,
  //   })
  // }

module.exports = mongoose.model("User", userSchema)