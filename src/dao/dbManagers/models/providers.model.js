import mongoose from 'mongoose';

const providersCollection = 'providers';

const providersSchema = new mongoose.Schema({
    business_name: {
        type: String,
        required: true
    },
    cuit_cuil: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    documents: {
        type: [
            {
                name: {
                    type: String
                },
                reference: {
                    type: String
                }
            }
        ],
        default: []
    },
    provider_datetime: {
        type: String,
        required: true
    }
});

export const providersModel = mongoose.model(providersCollection, providersSchema);
