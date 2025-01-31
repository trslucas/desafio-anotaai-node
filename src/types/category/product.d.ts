export interface ProductDTO {
  id: string
  title: string
  description: string
  ownerId: string
  price: number;
  categoryId: string
}


export interface IProductRepository {
  findAll(): Promise<ProductDTO[]>
  insert(product: ProductDTO): Promise<void>
  findById(id: string): Promise<ProductDTO | null>
  insert(product: ProductDTO): Promise<void>
  editProduct(id: string, newProductData: ProductDTO): Promise<void>
  deleteProduct(id: string): Promise<void>
}

export interface IProductService {
  findAll(): Promise<ProductDTO[]>
  findById(id: string): Promise<ProductDTO | null>
  insert(product: ProductDTO): Promise<void>
  editProduct(id: string, newProductData: ProductDTO): Promise<void>
  deleteProduct(id: string): Promise<void>
}