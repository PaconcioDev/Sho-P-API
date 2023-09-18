import { ProductModel } from "../models/products.js";

class ProductController {
  static async getAll(req, res) {
    const findProducts = await ProductModel.getAll();
    res.json(findProducts);
  }
  
  static async findOne(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findOne({ id });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json(product);
  }
}

export { ProductController };
