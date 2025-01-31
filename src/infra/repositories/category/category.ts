import { CategoryDTO, ICategoryRepository } from "../../../types/category/category";
import Category from "../../schemas/category";


export class CategoryRepository implements ICategoryRepository {
  async insert(category: CategoryDTO): Promise<void> {
    console.log(category)
    await Category.create(category); 
  }

  async findById(id: string): Promise<CategoryDTO | null> {

    const category = await Category.findById(id)


    if(!category) {

    return null
    }


    const categoryDTO = {
      id: String(category._id),
      title: category.title,
      description: category.description,
      ownerId: String(category.ownerId)
    }

    return categoryDTO
  }

  async findAll(): Promise<CategoryDTO[]> {
    const categories = await Category.find()

    const mappedCategories: CategoryDTO[] = categories.map(category => ({
      id: String(category._id),
      description: category.description,
      title: category.title,
      ownerId: String(category.ownerId)
    }));
  
    return mappedCategories;
  }

  async editCategory(id: string, newCategoryData: CategoryDTO): Promise<void> {
    
  

    const editedCategory: CategoryDTO = {
      id: String(newCategoryData?.id),
      description: newCategoryData?.description,
      title: newCategoryData?.title,
      ownerId: newCategoryData.ownerId

    }

    await Category.updateOne(
      { _id: id }, 
      { $set: editedCategory }
    );  
  }

  async deleteCategory(id: string): Promise<void> {
    await Category.deleteOne({
      _id: id,
    })
  }
}