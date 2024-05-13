import { providersModel } from "../dbManagers/models/providers.model.js";

export default class Partners {
    constructor() {
        console.log('Working with partners DB');        
    }
    getAll = async() => {
        const providers = await providersModel.find().lean();
        return providers;
    }
    getById = async(id) => {
        const providerById = await providersModel.findOne({ _id: id }).lean();
        return providerById;
    }
    getByEmail = async(email) => {
        const providerByEmail = await providersModel.findOne({ email }).lean();
        return providerByEmail;
    }
    save = async(provider) => {
        const providerSaved = await providersModel.create(provider);
        return providerSaved;
    }
    update = async(id, providerToUpdated) => {
        const providerUpdated = await providersModel.findByIdAndUpdate(id, providerToUpdated);
        return providerUpdated;
    }
    eliminate = async(id) => {
        const providerDeleted = await providersModel.findByIdAndDelete(id);
        return providerDeleted;
    }
}