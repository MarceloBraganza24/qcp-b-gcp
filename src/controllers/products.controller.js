import * as productsService from '../services/products.service.js';
import { ProductAlreadyExists, ProductByTitleExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const products = await productsService.getAll();
        res.sendSuccess(products);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { pid } = req.params;            
        const product = await productsService.getById(pid);
        res.sendSuccess(product);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body;
        if(!title || !description || !price || !stock || !category) return res.sendClientError('incomplete values');
        const registeredProduct = await productsService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredProduct);
    } catch (error) {
        if(error instanceof ProductByTitleExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const update = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = req.body;
        const productUpdated = await productsService.update(pid, product)
        res.sendSuccess(productUpdated);
    } catch (error) {
        if(error instanceof ProductAlreadyExists || error instanceof ProductByTitleExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const pid = req.params.pid;            
        const product = await productsService.eliminate(pid);
        res.sendSuccess(product);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}