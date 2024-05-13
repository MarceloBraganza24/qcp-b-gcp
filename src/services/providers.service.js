import ProvidersRepository from '../repositories/providers.repository.js';
import { ProviderAlreadyExists } from '../utils/custom.exceptions.js';
import { htmlNewRegister } from '../utils/custom.html.js';
import { sendEmail } from './mail.service.js';

const providersManager = new ProvidersRepository();

const getAll = async () => {
    const providers = await providersManager.getAll();
    return providers;
}
const getById = async (id) => {
    const provider = await providersManager.getById(id);
    return provider;
}
const register = async(provider) => {
    const providerByEmail = await providersManager.getByEmail(provider.email);
    if(providerByEmail) {
        throw new ProviderAlreadyExists('provider already exists');
    }
    const emailNewRegister = {
        to: provider.email,
        subject: 'Registro exitoso',
        html: htmlNewRegister
    }
    await sendEmail(emailNewRegister);
    provider.provider_datetime =  new Date().toLocaleString();
    const result = await providersManager.save(provider);
    return result;
}

const update = async (id, provider) => {
    const providerUpdated = await providersManager.update(id, provider);
    return providerUpdated;
}

const eliminate = async (id) => {
    const provider = await providersManager.eliminate(id);
    return provider;
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}