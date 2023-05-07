const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    role:{
        type: String, required: true, default: "user"
    },
    isVerified:{
        type: Boolean, required: true, default:false
    },
    email:{
        type: String, required: true
    },
    password:{
        type: String, required: true
    },
    info:{
        type: Object, required: true
    },
    verificationString:{
        type: String, required: true
    },
    passwordResetCode:{
        type: String
    },
    googleId:{
        type: String
    }
},{
    timestamps : true,
})

userSchema.pre("save", async()=>{
  
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel