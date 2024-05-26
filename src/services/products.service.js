import ProductsRepository from '../repositories/products.repository.js';
import { ProductAlreadyExists, ProductByTitleExists } from '../utils/custom.exceptions.js';

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
    const products = await productsManager.getAll();
    const productByTitleExists = products.find(item => item.title === product.title)
    if(productByTitleExists) {
        throw new ProductByTitleExists('There is already a product with that title');
    }
    product.product_datetime =  new Date().toLocaleString();
    const result = await productsManager.save(product);
    return result;
}

const update = async (id, product) => {
    const products = await productsManager.getAll();
    const productById = await productsManager.getById(id);
    const productByTitleExists = products.find(item => item.title === product.title)
    if(productById.title === product.title && productById.description === product.description && productById.price === product.price && productById.stock === product.stock && productById.category === product.category) {
        throw new ProductAlreadyExists('There is already a product with that data');
    }
    if(productById.title !== product.title || productById.description !== product.description || productById.price !== product.price || productById.stock !== product.stock || productById.category !== product.category) {
        if(productByTitleExists && (productByTitleExists._id.toString() !== productById._id.toString())) {
            throw new ProductByTitleExists('There is already a product with that title');
        }
        const productUpdated = await productsManager.update(id, product);
        return productUpdated;
    }
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