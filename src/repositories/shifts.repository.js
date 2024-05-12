import { Shifts } from '../dao/factory.js';

export default class ShiftsRepository {
    constructor() {
        this.dao = new Shifts();
    }
    getAll = async () => {
        const shifts = await this.dao.getAll();
        return shifts;
    }
    getById = async (id) => {
        const shift = await this.dao.getById(id);
        return shift;
    }
    save = async (shift) => {
        const shiftSaved = await this.dao.save(shift);
        return shiftSaved;
    }
    update = async (id, shift) => {
        const shiftUpdated = await this.dao.update(id, shift);
        return shiftUpdated;
    }
    eliminate = async (id) => {
        const shiftEliminated = await this.dao.eliminate(id);
        return shiftEliminated;
    }
}