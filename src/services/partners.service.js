import PartnersRepository from '../repositories/partners.repository.js';
import { PartnerByDniByEmailExists, PartnerByDniExists, PartnerByEmailExists, PartnerExists } from '../utils/custom.exceptions.js';
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
    const partners = await partnersManager.getAll();
    const partnerByDniByEmailExists = partners.find(item => item.dni === Number(partner.dni) && item.email === partner.email)
    const partnerByDniExists = partners.find(item => item.dni === Number(partner.dni))
    const partnerByEmailExists = partners.find(item => item.email === partner.email)
    if(partnerByDniByEmailExists) {
        throw new PartnerByDniByEmailExists('There is already a partner with that DNI and email');
    }
    if(partnerByDniExists) {
        throw new PartnerByDniExists('There is already a partner with that DNI');
    }
    if(partnerByEmailExists) {
        throw new PartnerByEmailExists('There is already a partner with that email');
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
    const partners = await partnersManager.getAll();
    const partnerById = await partnersManager.getById(id);
 
    const partnerByDniByEmailExists = partners.find(item => item.dni === Number(partner.dni) && item.email === partner.email)
    const partnerByDniExists = partners.find(item => item.dni === Number(partner.dni))
    const partnerByEmailExists = partners.find(item => item.email === partner.email)


    if(partnerById.first_name !== partner.first_name || partnerById.last_name !== partner.last_name && partnerById.dni === partner.dni || partnerById.phone !== partner.phone && partnerById.email === partner.email) {
        const partnerUpdated = await partnersManager.update(id, partner);
        return partnerUpdated;
    }
    if(partnerById.first_name === partner.first_name && partnerById.last_name === partner.last_name && partnerById.dni === partner.dni && partnerById.phone === partner.phone && partnerById.email === partner.email) {
        throw new PartnerExists('There is already a partner with that data');
    }
    if(partnerByDniByEmailExists) {
        throw new PartnerByDniByEmailExists('There is already a partner with that DNI and email');
    }
    if(partnerByDniExists && !partnerByEmailExists) {
        throw new PartnerByDniExists('There is already a partner with that DNI');
    }
    if(partnerByEmailExists && !partnerByDniExists) {
        throw new PartnerByEmailExists('There is already a partner with that email');
    }
    const partnerUpdated = await partnersManager.update(id, partner);
    return partnerUpdated;
    





    //const partnerByDniByEmailExists = partners.find(item => item.dni === Number(partner.dni) && item.email === partner.email)

    /* if(partnerById.first_name === partner.first_name && partnerById.last_name === partner.last_name && partnerById.dni === partner.dni && partnerById.phone === partner.phone && partnerById.email === partner.email) {
        throw new PartnerExists('There is already a partner with that data');
    }
    if(partnerById.first_name !== partner.first_name || partnerById.last_name !== partner.last_name && partnerById.dni === partner.dni || partnerById.phone !== partner.phone && partnerById.email === partner.email) {
        const partnerUpdated = await partnersManager.update(id, partner);
        return partnerUpdated;
    }
    if(partnerByDniByEmailExists) {
        throw new PartnerByDniByEmailExists('There is already a partner with that DNI and email');
    } */
    /* const partnerUpdated = await partnersManager.update(id, partner);
    return partnerUpdated; */
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