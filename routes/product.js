const express = require("express");
const router = express.Router();
const Product_Model = require("../models/Product_Model");
const validate = require("../middleware/validation.middleware");
const productSchema = require("../Schema/productSchema");


router.get("/", async (req, res) => {
  try {
    console.log(req.body);
    const response = await Product_Model.find();

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("product insertetion failed");
  }
});

router.post("/", validate(productSchema) ,async (req, res) => {
  try {
    console.log(req.body);

    const product = new Product_Model(req.body);
    
    await product.save();

    res.send("product inserted");
  } catch (error) {
    console.log(error);
    res.send("product insertion failed");
  }
});



router.put("/:id", async (req, res) => {
  try {
   
     const {id}=req.params;
    const result=await Product_Model.findByIdAndUpdate(id, req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send("product update failed");
  }
});

router.patch("/:id", async (req, res) => {
  try {
     const {id}=req.params;
   const record= await Product_Model.findById(id);
   for (const key in req.body) {
      record[key]=req.body[key];
   }
   const finalRes = await record.save();

    res.send("product patched");
  } catch (error) {
    console.log(error);
    res.send("product patch failed");
  }
});

/* router.get("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    console.log(id);
    const response = await Product_Model.findById(id);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("register failed");
  }
}); */

module.exports = router;
