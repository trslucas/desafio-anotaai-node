import { Category as CategoryType, ICategoryRepository } from "../../../types/category/category";
import Category, { ICategory } from "../../schema"; // Certifique-se de importar a interface correta

export class CategoryRepository implements ICategoryRepository {
  async insert(category: CategoryType): Promise<void> {
    console.log(category)
    await Category.create(category); 
  }

  async findById(id: string): Promise<ICategory | null> {
    return await Category.findById(id)
  }
}