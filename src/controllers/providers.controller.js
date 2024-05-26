import * as providersService from '../services/providers.service.js';
import { ProviderByCuitCuilExists, ProviderByEmailExists, ProviderByBusinessNameExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const providers = await providersService.getAll();
        res.sendSuccess(providers);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { pid } = req.params;            
        const provider = await providersService.getById(pid);
        res.sendSuccess(provider);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { business_name ,cuit_cuil, phone, email } = req.body;
        if(!business_name || !cuit_cuil || !phone || !email) return res.sendClientError('incomplete values');
        const registeredProvider = await providersService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredProvider);
    } catch (error) {
        if(error instanceof ProviderByCuitCuilExists || error instanceof ProviderByEmailExists || error instanceof ProviderByBusinessNameExists) {
            return res.sendClientError(error.message);
        }
        if (error.code === 11000) {
            res.status(409).send({ message: 'Duplicate key error', field: 'email' });
        } else {
            res.sendServerError(error.message);
            req.logger.error(error.message);
        }
    }
}

const update = async (req, res) => {
    try {
        const pid = req.params.pid;
        const provider = req.body;
        const providerUpdated = await providersService.update(pid, provider)
        res.sendSuccess(providerUpdated);
    } catch (error) {
        if(error instanceof ProviderByCuitCuilExists || error instanceof ProviderByEmailExists || error instanceof ProviderByBusinessNameExists) {
            return res.sendClientError(error.message);
        }
        if (error.code === 11000) {
            res.status(409).send({ message: 'Duplicate key error', field: 'email' });
        } else {
            res.sendServerError(error.message);
            req.logger.error(error.message);
        }
    }
}

const eliminate = async (req, res) => {
    try {
        const pid = req.params.pid;            
        const provider = await providersService.eliminate(pid);
        res.sendSuccess(provider);
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