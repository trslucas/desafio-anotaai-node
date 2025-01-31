import { randomUUID } from "node:crypto";
import CategoryService from "../../core/services/category";
import { Router, Request, NextFunction, Response } from "express";

export default class CategoryContoller {
  private categoryService: CategoryService
  public router: Router



  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService
    this.router = Router()
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post("/", this.insertCategory.bind(this));
    this.router.get("/all", this.findAll.bind(this));
    this.router.get("/:categoryId", this.findById.bind(this));
    this.router.put("/:categoryId", this.editCategory.bind(this));
    this.router.delete("/:categoryId", this.deleteCategory.bind(this));
  
  }

  async insertCategory(request: Request, response: Response, next: NextFunction) {

    try {
      const {ownerId, description, title} = request.body

      const newCategory = {
        id: randomUUID(),
        ownerId,
        description,
        title
      }
      await this.categoryService.insert(newCategory)

      response.status(201).send()
    } catch(err: any) {
      next(
        `<Category.insertCategory> Finishing with error ErrorMessage[${err.message}]`
      )
    }
   
  }


  async findAll(_request: Request, response: Response, next: NextFunction) {

    try {
      const categories = await this.categoryService.findAll()

      response.status(200).send(categories)
    } catch(err: any) {
      next(
        `<Category.findAll> Finishing with error ErrorMessage[${err.message}]`
      )
    }
   
  }


  async findById(request: Request, response: Response, next: NextFunction) {

    try {

      const { categoryId } = request.params
      const category = await this.categoryService.findById(categoryId)

      response.status(200).send(category)
    } catch(err: any) {
      next(
        `<Category.findById> Finishing with error ErrorMessage[${err.message}]`
      )
    }
   
  }


  async editCategory(request: Request, response: Response, next: NextFunction) {
    try { 
      const { categoryId } = request.params
      const { ownerId, description, title } = request.body


      const categoryToEdit =  {
        id: categoryId,
        description,
        title,
        ownerId,
      }

      const editedCategory = await this.categoryService.editCategory(categoryId, categoryToEdit)
      response.status(200).send(editedCategory)
    } catch(err: any) {
      next(
        `<Category.editCategory> Finishing with error ErrorMessage[${err.message}]`
      )
    }
  }


  async deleteCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const { categoryId } = request.params

      await this.categoryService.deleteCategory(categoryId)
      response.status(200).send()
    } catch(err: any) {
      next(
          `<Category.deleteCategory> Finishing with error ErrorMessage[${err.message}]`
      )
    }
  }
  
}