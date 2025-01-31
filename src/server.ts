import express from "express";
import { connectToDatabase } from "./infra/config";
import { CategoryRepository } from "./infra/repositories/category/category";
import CategoryService from "./core/services/category";
import CategoryController from "./http/controllers/category";

const app = express();

const PORT = 3000;

app.use(express.json());


connectToDatabase();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

app.use("/categories", categoryController.router);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});