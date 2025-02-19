// biome-ignore lint/style/useImportType: <explanation>
import { CategoryRepository } from "../../infra/repositories/category/category";
// biome-ignore lint/style/useImportType: <explanation>
import {  CategoryDTO, ICategoryService } from "../../types/category/category";

export default class CategoryService implements ICategoryService {

  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }
 async insert(category: CategoryDTO): Promise<void> {

  await this.categoryRepository.insert(category)
   
  }

  async findById(id: string): Promise<CategoryDTO | null> {
    
    const category = await this.categoryRepository.findById(id)


    if(!category) {
      return null
    }
    return category

  }

  async findAll(): Promise<CategoryDTO[]> {
    const categories = await this.categoryRepository.findAll()

    return categories
  }


  async editCategory(id: string, newCategoryData: CategoryDTO): Promise<void> {
    const category = await this.categoryRepository.findById(id)

    if(!category) {
      throw new Error('Category not found')
    }


  const categoryDataToEdit: CategoryDTO = {
    id: String(category.id),
    description: newCategoryData.description ?? category.description,
    title: newCategoryData.title ?? category.title,
    ownerId: String(category.ownerId)
  } 
  
    await this.categoryRepository.editCategory(category.id, categoryDataToEdit)

  }


  async deleteCategory(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id)

    if(!category) {
      throw new Error('Category not found')
    }

    await this.categoryRepository.deleteCategory(category.id)
  }


  

}