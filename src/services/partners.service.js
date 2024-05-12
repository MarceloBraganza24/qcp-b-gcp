import PartnersRepository from '../repositories/partners.repository.js';
import { PartnerAlreadyExists } from '../utils/custom.exceptions.js';
import { htmlNewRegister } from '../utils/custom.html.js';
import { sendEmail } from './mail.service.js';

const partnersManager = new PartnersRepository();

const getAll = async () => {
    const partners = await partnersManager.getAll();
    return partners;
}
const getById = async (id) => {
    const partner = await partnersManager.getById(id);
    return partner;
}
const register = async(partner) => {
    const partnerByEmail = await partnersManager.getByEmail(partner.email);
    if(partnerByEmail) {
        throw new PartnerAlreadyExists('partner already exists');
    }
    const emailNewRegister = {
        to: partner.email,
        subject: 'Registro exitoso',
        html: htmlNewRegister
    }
    await sendEmail(emailNewRegister);
    partner.partner_datetime =  new Date().toLocaleString();
    const result = await partnersManager.save(partner);
    return result;
}

const update = async (id, partner) => {
    const partnerUpdated = await partnersManager.update(id, partner);
    return partnerUpdated;
}

const eliminate = async (id) => {
    const partner = await partnersManager.eliminate(id);
    return partner;
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}