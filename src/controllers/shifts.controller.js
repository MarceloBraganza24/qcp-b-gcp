import * as shiftsService from '../services/shifts.service.js';
import { ShiftByDateByScheduleExists, ShiftExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const shifts = await shiftsService.getAll();
        res.sendSuccess(shifts);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { sid } = req.params;            
        const shift = await shiftsService.getById(sid);
        res.sendSuccess(shift);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const save = async (req, res) => {
    try {
        const { first_name, last_name, date, schedule } = req.body;
        let dateToChange = new Date(date);
        const dateShift = dateToChange.toISOString().split('T')[0]
        const shift = await shiftsService.save(first_name, last_name, dateShift, schedule);
        res.sendSuccessNewResourse(shift);
    } catch (error) {
        if(error instanceof ShiftByDateByScheduleExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const update = async (req, res) => {
    try {
        const sid = req.params.sid;
        const shift = req.body;
        let dateToChange = new Date(shift.date);
        const dateShift = dateToChange.toISOString().split('T')[0]
        shift.date = dateShift;
        const shiftUpdated = await shiftsService.update(sid, shift)
        res.sendSuccess(shiftUpdated);
    } catch (error) {
        if(error instanceof ShiftByDateByScheduleExists || error instanceof ShiftExists ) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const sid = req.params.sid;            
        const shift = await shiftsService.eliminate(sid);
        res.sendSuccess(shift);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    save,
    update,
    eliminate
}