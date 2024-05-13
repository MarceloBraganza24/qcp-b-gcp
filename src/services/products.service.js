import ProductsRepository from '../repositories/products.repository.js';
import { ProductAlreadyExists } from '../utils/custom.exceptions.js';
import { htmlNewRegister } from '../utils/custom.html.js';
import { sendEmail } from './mail.service.js';

const productsManager = new ProductsRepository();

const getAll = async () => {
    const products = await productsManager.getAll();
    return products;
}
const getById = async (id) => {
    const product = await productsManager.getById(id);
    return product;
}
const register = async(product) => {
    product.product_datetime =  new Date().toLocaleString();
    const result = await productsManager.save(product);
    return result;
}

const update = async (id, product) => {
    const productUpdated = await productsManager.update(id, product);
    return productUpdated;
}

const eliminate = async (id) => {
    const product = await productsManager.eliminate(id);
    return product;
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}