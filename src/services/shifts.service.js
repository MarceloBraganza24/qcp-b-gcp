import ShiftsRepository from '../repositories/shifts.repository.js';
import { ShiftByDateByScheduleExists, ShiftExists } from '../utils/custom.exceptions.js';

const shiftsManager = new ShiftsRepository();

const getAll = async () => {
    const shifts = await shiftsManager.getAll();
    return shifts;
}
const getById = async (id) => {
    const shift = await shiftsManager.getById(id);
    return shift;
}
const save = async (first_name, last_name, date, schedule) => {
    const shifts = await shiftsManager.getAll();
    const shiftByDateByScheduleExists = shifts.find(shift => shift.date === date && shift.schedule === schedule)
    if(shiftByDateByScheduleExists) {
        throw new ShiftByDateByScheduleExists('There is already a shift with that date and time');
    }
    const shift = {
        first_name,
        last_name,
        date,
        schedule,
        shift_datetime:  new Date().toLocaleString()
    }
    const shiftSaved = await shiftsManager.save(shift);
    return shiftSaved;
}

const update = async (id, shift) => {
    const shifts = await shiftsManager.getAll();
    const shiftOfBD = await shiftsManager.getById(id);
    const shiftByDateByScheduleExists = shifts.find(item => item.date === shift.date && item.schedule === shift.schedule)
    if(shiftOfBD.first_name === shift.first_name && shiftOfBD.last_name === shift.last_name && shiftOfBD.date === shift.date && shiftOfBD.schedule === shift.schedule) {
        throw new ShiftExists('There is already a shift with that data');
    }
    if(shiftOfBD.first_name !== shift.first_name || shiftOfBD.last_name !== shift.last_name || shiftOfBD.date !== shift.date || shiftOfBD.schedule !== shift.schedule) {
        if(shiftByDateByScheduleExists && (shiftByDateByScheduleExists._id.toString() !== shiftOfBD._id.toString())) {
            throw new ShiftByDateByScheduleExists('There is already a shift with that date and time');
        }
        const shiftUpdated = await shiftsManager.update(id, shift);
        return shiftUpdated;
    }
}

const eliminate = async (id) => {
    const shift = await shiftsManager.eliminate(id);
    return shift;
}

export {
    getAll,
    getById,
    save,
    update,
    eliminate
}