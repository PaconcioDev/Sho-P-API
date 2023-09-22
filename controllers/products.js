import { ProductModel } from "../models/products.js";
import { validateMovie } from "../schemas/products.js";

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

  static async create(req, res) {
    const result = validateMovie(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const newProduct = await ProductModel.create({ input: result.data });
    res.status(201).json(newProduct);
  }
}

export { ProductController };
