import ProvidersRepository from '../repositories/providers.repository.js';
import { ProviderByEmailExists, ProviderByCuitCuilExists } from '../utils/custom.exceptions.js';
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
    const providers = await providersManager.getAll();
    const providerByCuitCuilExists = providers.find(item => item.cuit_cuil === Number(provider.cuit_cuil))
    const providerByEmailExists = providers.find(item => item.email === provider.email)
    if(providerByCuitCuilExists) {
        throw new ProviderByCuitCuilExists('There is already a provider with that CUIT-CUIL');
    }

    if(providerByEmailExists) {
        throw new ProviderByEmailExists('There is already a provider with that email');
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
    const providers = await providersManager.getAll();
    const providerById = await providersManager.getById(id);
    const providerByCuitCuilExists = providers.find(item => item.cuit_cuil === Number(provider.cuit_cuil))
    const providerByEmailExists = providers.find(item => item.email === provider.email)
    if(providerById.business_name === provider.business_name && providerById.cuit_cuil === provider.cuit_cuil && providerById.phone === provider.phone && providerById.email === provider.email) {
        throw new ProviderExists('There is already a provider with that data');
    }
    if(providerById.business_name !== provider.business_name && providerById.cuit_cuil !== provider.cuit_cuil && providerById.phone !== provider.phone && providerById.email !== provider.email) {
        if(providerByCuitCuilExists && providerByCuitCuilExists.business_name !== provider.business_name && providerByCuitCuilExists.cuit_cuil !== provider.cuit_cuil && providerByCuitCuilExists.phone !== provider.phone && providerByCuitCuilExists.email !== provider.email) {
            throw new ProviderByCuitCuilExists('There is already a partner with that DNI');
        }
        if(providerByEmailExists && providerByEmailExists.business_name !== provider.business_name && providerByEmailExists.cuit_cuil !== provider.cuit_cuil && providerByEmailExists.dni !== provider.dni && providerByEmailExists.phone !== provider.phone) {
            throw new ProviderByEmailExists('There is already a partner with that email');
        }
        const providerUpdated = await providersManager.update(id, provider);
        return providerUpdated;
    }
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