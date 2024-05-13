import { productsModel } from "../dbManagers/models/products.model.js";

export default class Products {
    constructor() {
        console.log('Working with partners DB');        
    }
    getAll = async() => {
        const products = await productsModel.find().lean();
        return products;
    }
    getById = async(id) => {
        const productById = await productsModel.findOne({ _id: id }).lean();
        return productById;
    }
    getByEmail = async(email) => {
        const productByEmail = await productsModel.findOne({ email }).lean();
        return productByEmail;
    }
    save = async(product) => {
        const productSaved = await productsModel.create(product);
        return productSaved;
    }
    update = async(id, productToUpdated) => {
        const productUpdated = await productsModel.findByIdAndUpdate(id, productToUpdated);
        return productUpdated;
    }
    eliminate = async(id) => {
        const productDeleted = await productsModel.findByIdAndDelete(id);
        return productDeleted;
    }
}