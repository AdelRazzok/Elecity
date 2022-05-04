import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    car_available: {
        type: Boolean,
        required: true,
    },
    car_brand: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    car_model: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    car_category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    car_color: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    car_state: {
        type: Number,
        required: true,
    },

    car_kilometer: {
        type: Number,
        required: true,
    },
    car_history: {
        car_purchase: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        car_crashed: {
            type: Boolean,
            required: true,
        },
        crash_history: {
            type: String,
            trim: true,
            lowercase: true
        }
    }
}, { versionKey: false, timestamps: true })

const carModel = mongoose.model('carModel', carSchema, 'elecity_cars')

export default carModel