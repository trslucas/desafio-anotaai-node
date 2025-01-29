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
  
}