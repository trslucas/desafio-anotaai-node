import express from "express";
import { connectToDatabase } from "./infra/config";
import { CategoryRepository } from "./infra/repositories/category/category";
import CategoryService from "./core/services/category";
import CategoryController from "./http/controllers/category";
import { ProductRepository } from "./infra/repositories/product/product";
import ProductService from "./core/services/product";
import ProductContoller from "./http/controllers/product";

const app = express();

const PORT = 3000;

app.use(express.json());


connectToDatabase();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);



const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductContoller(productService)

app.use("/categories", categoryController.router);
app.use("/products", productController.router);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});