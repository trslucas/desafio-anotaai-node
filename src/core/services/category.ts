import { CategoryRepository } from "../../infra/repositories/category/category";
import { Category, ICategoryService } from "../../types/category/category";

export default class CategoryService implements ICategoryService {

  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }
 async insert(category: Category): Promise<void> {

  await this.categoryRepository.insert(category)
   
  }

}