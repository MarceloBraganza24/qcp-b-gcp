import { Products } from '../dao/factory.js';

export default class ProductsRepository {
    constructor() {
        this.dao = new Products();
    }
    getAll = async() => {
        const products = await this.dao.getAll();
        return products;
    }
    getById = async(pid) => {
        const productById = await this.dao.getById(pid);
        return productById;
    }
    getByEmail = async(email) => {
        const product = await this.dao.getByEmail(email);
        return product;
    }
    save = async(product) => {
        const productSaved = await this.dao.save(product);
        return productSaved;
    }
    update = async(id, productToUpdate) => {
        const productUpdated = await this.dao.update(id, productToUpdate);
        return productUpdated;
    }
    eliminate = async(id) => {
        const productDeleted = await this.dao.eliminate(id);
        return productDeleted;
    }
}

