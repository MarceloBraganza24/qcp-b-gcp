import config from '../config/config.js';

export let Users;
export let Tickets;
export let Shifts;
export let Partners;
export let Providers;
export let Products;

const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Working with MongoDB persistence');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: UsersMongo } = await import('./dbManagers/users.manager.js');
        const { default: TicketsMongo } = await import('./dbManagers/tickets.manager.js');
        const { default: ShiftsMongo } = await import('./dbManagers/shifts.manager.js');
        const { default: PartnersMongo } = await import('./dbManagers/partners.manager.js');
        const { default: ProvidersMongo } = await import('./dbManagers/providers.manager.js');
        const { default: ProductsMongo } = await import('./dbManagers/products.manager.js');
        Users = UsersMongo;
        Tickets = TicketsMongo;
        Shifts = ShiftsMongo;
        Partners = PartnersMongo;
        Providers = ProvidersMongo;
        Products = ProductsMongo;
        break;
    case 'FILE':
        /* const { default: UsersFile } = await import('./fileManagers/users.manager.js');
        Users = UsersFile; */
        break;
}