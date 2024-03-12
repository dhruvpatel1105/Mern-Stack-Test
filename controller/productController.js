const ProductModel = require("../models/product.model");

class ProductController {

  saveProduct = async function (req, res, next) {
    const product = new ProductModel(req.body);
    const productInfo = await product.save();
    res.send(productInfo);
  };

  updateProruct = async function (req, res, next) {
    const { id } = req.params;
    const updatedRecord = await productModel.findByIdAndUpdate(id, req.body);
    res.send(updatedRecord);
  };

  patchProduct = async function (req, res, next) {
    const { id } = req.params;
    const record = await productModel.findById(id);
    for (const key in req.body) {
      record[key] = req.body[key];
    }
    const finalRes = await record.save();
    res.send(finalRes);
  };
}

module.exports = ProductController