import mongoose, { Schema, Document } from "mongoose";
import CategoryEntitiy from "../domain/category";
import ProductEntity from "../domain/product";



export interface ICategory extends Omit<CategoryEntitiy, "id">, Document {}

const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    description: {type: String, required: true},
    ownerId: {type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;

