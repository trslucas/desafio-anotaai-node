
import { IProductRepository, ProductDTO } from "../../../types/category/product";
import Product from "../../schemas/product";


export class ProductRepository implements IProductRepository {
  async insert(product: ProductDTO): Promise<void> {
    console.log(product)
    await Product.create(product); 
  }

  async findById(id: string): Promise<ProductDTO | null> {

    const product = await Product.findById(id)


    if(!product) {

    return null
    }


    const productDTO = {
      id: String(product._id),
      title: product.title,
      description: product.description,
      ownerId: String(product.ownerId),
      price: Number(product.price),
      categoryId: String(product.categoryId)
    }

    return productDTO
  }

  async findAll(): Promise<ProductDTO[]> {
    const categories = await Product.find()

    const mappedCategories: ProductDTO[] = categories.map(product => ({
      id: String(product._id),
      description: product.description,
      title: product.title,
      ownerId: String(product.ownerId),
      price: Number(product.price),
      categoryId: String(product.categoryId)
    }));
  
    return mappedCategories;
  }

  async editProduct(id: string, newProductData: ProductDTO): Promise<void> {
    
  

    const editedProduct: ProductDTO = {
      id: String(newProductData?.id),
      description: newProductData?.description,
      title: newProductData?.title,
      ownerId: newProductData.ownerId,
      price: newProductData.price,
      categoryId: newProductData.categoryId,


    }

    await Product.updateOne(
      { _id: id }, 
      { $set: editedProduct }
    );  
  }

  async deleteProduct(id: string): Promise<void> {
    await Product.deleteOne({
      _id: id,
    })
  }
}