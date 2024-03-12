const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var validatePassword = function (email) {
  var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return re.test(email);
};

const userSchema = new Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: "Email validation failed",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validatePassword,
      message: "Password validation failed",
    },
  },
},{
  toJSON:{
    transform:function (doc,ret){
        delete ret.password;
    }
  }
});

/* userSchema.pre("save",function (next){
    console.log("this  "+ this.password);
    const saltRounds = 10;
   
    bcrypt.genSalt(saltRounds, function(err, salt) {
      console.log("this  "+ this.password +"salt"+ salt);
      bcrypt.hash(this.password, salt, function(err, hash) {
        console.log("this  "+ this.password  +"salt"+ hash);
        this.password = hash;
        next(); 
      });
  });

   
}); */
userSchema.pre("save", function (next) {
  console.log("this  " + this.password);
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          next();
      });
  });
});

userSchema.methods={
  comparePassword:async function(password){
    const match = await bcrypt.compare(password,this.password);
    return match;
  },
  generateToken:async function(){
    try {
      return jwt.sign(
        {
          name: this.name,
          email: this.email,
          id: this._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 24 * 60 * 60,
        },
      );
    } catch (error) {
      console.log(error);
    }
   
  }
}


const User_Model=model("user",userSchema);

module.exports=User_Model;