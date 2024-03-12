const express = require("express");
const router = express.Router();
const userModel = require("../models/User_Model");
const bcrypt = require("bcrypt");
const errorMiddleware = require("../middleware/error.middleware");

/* router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, name, password } = req.body;
    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
      return res.send("User already exist");
    }
    const user = new userModel(req.body);
    await user.save();
    res.send("register successfully");
  } catch (error) {
    console.log(error);
    res.send("register failed");
  }
}); */

router.post("/register", async (req, res) => {
    try {
      console.log(req.body);
      const { email, name, password } = req.body;

      const isUserExists = await userModel.findOne({ email });
      if (isUserExists) {
         res.send("User already exists");
      }
  
      
      const user=await userModel.create(req.body);

 

      res.send({ user ,accessToken: await user.generateToken()});
  
      
    } catch (error) {
      console.log(error);
      res.send("Register failed");
    }
  });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email  " + email);
    const user = await userModel.findOne({ email });

    if (!user) {
     res.send("username not exist");
    }
    const match = await user.comparePassword(password);
    /*  const match = await bcrypt.compare(password,user.password); */

    
    if (!match) {
      res.send("password is not valid");
    }

    res.send({ user ,accessToken:await  user.generateToken()});
   
    /* var accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.PRIVATE_TOKEN);
        res.send({accessToken,user}); */
  } catch (error) {
     console.log(error);
  }
});


module.exports = router;
