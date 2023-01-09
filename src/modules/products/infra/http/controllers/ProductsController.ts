import { Request, Response } from 'express';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductsService from '../../../services/ListProductsService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import { container, injectable } from 'tsyringe';

@injectable()
export default class ProductsController {
    async index(request: Request, response: Response): Promise<Response> {
        const listProducts = container.resolve(ListProductsService);

        const products = await listProducts.execute();

        return response.json(products);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProduct = container.resolve(ShowProductService);

        const product = await showProduct.execute({ id });

        return response.json(product);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;

        const createProduct = container.resolve(CreateProductService);

        const product = await createProduct.execute({
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;

        const updateProduct = container.resolve(UpdateProductService);

        const productUpdate = await updateProduct.execute({
            id,
            name,
            price,
            quantity,
        });

        return response.json(productUpdate);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteProduct = container.resolve(DeleteProductService);

        const productDelete = await deleteProduct.execute({ id });

        return response.json(productDelete);
    }
}
