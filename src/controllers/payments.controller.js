import * as shiftsService from '../services/shifts.service.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-8730839288140102-041711-5191da1d09ff6dadb6da4e113c6fd8bc-1771017789' });
const createOrderShift = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts",
                failure: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts",
                pending: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts"
            },
            auto_return: "approved",
            notification_url: `https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/webhook-shift?first_name=${req.body.first_name}&last_name=${req.body.last_name}&date=${req.body.date}&schedule=${req.body.schedule}`
        }
        const preference = new Preference(client)
        const result = await preference.create({body});
        res.json({
            id: result.id
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const createOrderPartner = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts",
                failure: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts",
                pending: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts"
            },
            auto_return: "approved",
            notification_url: `https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/webhook-partner?first_name=${req.body.first_name}&last_name=${req.body.last_name}&dni=${req.body.dni}&phone=${req.body.phone}&email=${req.body.email}`
        }
        const preference = new Preference(client)
        const result = await preference.create({body});
        res.json({
            id: result.id
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getWebhooksShifts = async (req, res) => {
    const payment = req.query;
    const d = new Date(payment.date)
    const dateString = d.toISOString().split('T')[0]
    const paymentId = payment['data.id'];
    if(payment.type === 'payment') {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
        const data = await response.json();
        if(data.status === 'approved' && data.status_detail === 'accredited') {
            await shiftsService.save(payment.first_name, payment.last_name, dateString, payment.schedule);
            res.sendStatus(200);
        }
    }
}

const getWebhooksPartners = async (req, res) => {
    const payment = req.query;
    const paymentId = payment['data.id'];
    if(payment.type === 'payment') {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
        const data = await response.json();
        if(data.status === 'approved' && data.status_detail === 'accredited') {
            const partner = {
                first_name: payment.first_name,
                last_name: payment.last_name,
                dni: payment.dni,
                phone: payment.phone,
                email: payment.email,
            }
            await fetch('https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/partners/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(partner)
            })
            res.sendStatus(200);
        }
    }
}

export {
    createOrderShift,
    createOrderPartner,
    getWebhooksShifts,
    getWebhooksPartners
}