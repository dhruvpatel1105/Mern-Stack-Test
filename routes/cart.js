const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
  res.send("this is cart");
});
router.post("/", (req, res) => {
  res.send(" cart post");
});
router.put("/",(req,res)=>{
    res.send("put")
});
router.delete("/",(req,res)=>{
    res.send("delete")
});


module.exports = router;