import { Providers } from '../dao/factory.js';

export default class ProvidersRepository {
    constructor() {
        this.dao = new Providers();
    }
    getAll = async() => {
        const providers = await this.dao.getAll();
        return providers;
    }
    getById = async(pid) => {
        const providerById = await this.dao.getById(pid);
        return providerById;
    }
    getByEmail = async(email) => {
        const provider = await this.dao.getByEmail(email);
        return provider;
    }
    save = async(provider) => {
        const providerSaved = await this.dao.save(provider);
        return providerSaved;
    }
    update = async(id, providerToUpdate) => {
        const providerUpdated = await this.dao.update(id, providerToUpdate);
        return providerUpdated;
    }
    eliminate = async(id) => {
        const providerDeleted = await this.dao.eliminate(id);
        return providerDeleted;
    }
}

