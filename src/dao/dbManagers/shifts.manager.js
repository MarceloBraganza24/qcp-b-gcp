import { shiftsModel } from '../dbManagers/models/shifts.model.js'

export default class ShiftsDao {
    constructor() {
        console.log('Working with partners DB');        
    }
    getAll = async() => {
        const shifts = await shiftsModel.find().lean();
        return shifts;
    }
    getById = async(id) => {
        const shift = await shiftsModel.findById(id).lean();
        return shift;
    }
    save = async(shift) => {
        const shiftSaved = await shiftsModel.create(shift);
        return shiftSaved;
    }
    update = async(id, shift) => {
        const shiftUpdated = await shiftsModel.findByIdAndUpdate(id, shift);
        return shiftUpdated;
    }
    eliminate = async(id) => {
        const shiftSaved = await shiftsModel.findByIdAndDelete(id);
        return shiftSaved;
    }
}