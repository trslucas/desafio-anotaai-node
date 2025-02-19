import { randomUUID } from "node:crypto";
// biome-ignore lint/style/useImportType: <explanation>
import ProductService from "../../core/services/product";
// biome-ignore lint/style/useImportType: <explanation>
import { Router, Request, NextFunction, Response } from "express";

export default class ProductContoller {
	private productService: ProductService;
	public router: Router;

	constructor(productService: ProductService) {
		this.productService = productService;
		this.router = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.router.post("/", this.insertProduct.bind(this));
		this.router.get("/all", this.findAll.bind(this));
		this.router.get("/:productId", this.findById.bind(this));
		this.router.put("/:productId", this.editProduct.bind(this));
		this.router.delete("/:productId", this.deleteProduct.bind(this));
	}

	async insertProduct(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { ownerId, description, title, categoryId, price } = request.body;

			const newProduct = {
				id: randomUUID(),
				ownerId,
				description,
				title,
				categoryId,
				price,
			};
			await this.productService.insert(newProduct);

			response.status(201).send();
		} catch (err: any) {
			next(
				`<Product.insertProduct> Finishing with error ErrorMessage[${err.message}]`,
			);
		}
	}

	async findAll(_request: Request, response: Response, next: NextFunction) {
		try {
			const categories = await this.productService.findAll();

			response.status(200).send(categories);
		} catch (err: any) {
			next(
				`<Product.findAll> Finishing with error ErrorMessage[${err.message}]`,
			);
		}
	}

	async findById(request: Request, response: Response, next: NextFunction) {
		try {
			const { productId } = request.params;
			const product = await this.productService.findById(productId);

			response.status(200).send(product);
		} catch (err: any) {
			next(
				`<Product.findById> Finishing with error ErrorMessage[${err.message}]`,
			);
		}
	}

	async editProduct(request: Request, response: Response, next: NextFunction) {
		try {
			const { productId } = request.params;
			const { ownerId, description, title, categoryId, price } = request.body;

			const productToEdit = {
				id: productId,
				description,
				title,
				ownerId,
				categoryId,
				price,
			};

			const editedProduct = await this.productService.editProduct(
				productId,
				productToEdit,
			);
			response.status(200).send(editedProduct);
		} catch (err: any) {
			next(
				`<Product.editProduct> Finishing with error ErrorMessage[${err.message}]`,
			);
		}
	}

	async deleteProduct(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { productId } = request.params;

			await this.productService.deleteProduct(productId);
			response.status(200).send();
		} catch (err: any) {
			next(
				`<Product.deleteProduct> Finishing with error ErrorMessage[${err.message}]`,
			);
		}
	}
}
