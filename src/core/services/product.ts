
import { ProductRepository } from "../../infra/repositories/product/product";
import { IProductService, ProductDTO } from "../../types/category/product";


export default class ProductService implements IProductService {

  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }
 async insert(product: ProductDTO): Promise<void> {

  await this.productRepository.insert(product)
   
  }

  async findById(id: string): Promise<ProductDTO | null> {
    
    const product = await this.productRepository.findById(id)


    if(!product) {
      return null
    }
    return product

  }

  async findAll(): Promise<ProductDTO[]> {
    const categories = await this.productRepository.findAll()

    return categories
  }


  async editProduct(id: string, newProductData: ProductDTO): Promise<void> {
    const product = await this.productRepository.findById(id)

    if(!product) {
      throw new Error('Product not found')
    }


  const productDataToEdit: ProductDTO = {
    id: String(product.id),
    description: newProductData.description ?? product.description,
    title: newProductData.title ?? product.title,
    ownerId: String(product.ownerId),
    price: newProductData.price ?? product.price,
    categoryId: newProductData.categoryId ?? product.categoryId,
  } 
  
    await this.productRepository.editProduct(product.id, productDataToEdit)

  }


  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findById(id)

    if(!product) {
      throw new Error('Product not found')
    }

    await this.productRepository.deleteProduct(product.id)
  }


  

}