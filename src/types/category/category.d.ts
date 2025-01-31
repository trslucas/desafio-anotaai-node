export interface CategoryDTO {
  id: string
  title: string
  description: string
  ownerId: string
}


export interface ICategoryRepository {
  findAll(): Promise<CategoryDTO[]>
  insert(category: Category): Promise<void>
  findById(id: string): Promise<CategoryDTO | null>
  insert(category: CategoryDTO): Promise<void>
  editCategory(id: string, newCategoryData: CategoryDTO): Promise<void>
  deleteCategory(id: string): Promise<void>
}

export interface ICategoryService {
  findAll(): Promise<CategoryDTO[]>
  findById(id: string): Promise<CategoryDTO | null>
  insert(category: CategoryDTO): Promise<void>
  editCategory(id: string, newCategoryData: CategoryDTO): Promise<void>
  deleteCategory(id: string): Promise<void>
}