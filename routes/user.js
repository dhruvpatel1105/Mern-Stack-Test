const express = require("express");
const router = express.Router();
const userModel = require("../models/User_Model");

router.get("/", async (req, res) => {
  try {
    console.log(req.body);
    const response = await userModel.find();

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("register failed");
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    console.log(id);
    const response = await userModel.findById(id);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("register failed");
  }
});

module.exports = router;
