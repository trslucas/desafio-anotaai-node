export interface Category {
  id: string
  title: string
  description: string
  ownerId: string
}


export interface ICategoryRepository {
  insert(category: Category): Promise<void>
}

export interface ICategoryService {
  insert(category: Category): Promise<void>
}