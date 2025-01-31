import mongoose, { Document, Schema } from "mongoose";
import ProductEntity from "../domain/product";

export interface IProduct extends Omit<ProductEntity, "id">, Document {}

export const ProductSchema = new Schema<IProduct>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  ownerId: {type: String, required: true},
  categoryId: {type: String, required: true},
  price: {type: Number, required: true}
},
{
  timestamps: true
}

);


const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;