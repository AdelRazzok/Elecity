import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    available: {
        type: Boolean,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    acquisition_date: {
        type: String,
        required: true,
        trim: true,
    },
    mileage: {
        type: Number,
        required: true,
        trim: true,
    },
    platform_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },

    offer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    rents: [{
        rent_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
        start_date: {
            type: String,
            required: true,
            trim: true
        },
        end_date: {
            type: String,
            required: true,
            trim: true
        },
        has_started: {
            type: Boolean,
            required: true,
            trim: true
        },
        start_date_confirmed: {
            type: String,
            trim: true
        },
        end_date_confirmed: {
            type: String,
            trim: true
        },
        platform_id_start: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
    }],
    incidents: [{
        incident_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
        signal_date: {
            type: String,
            required: true,
            trim: true
        },
        details: {
            type: String,
            required: true,
            trim: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
        rent_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
        files: {
            photo: {
                image_kit_id: {
                    type: String,
                    required: true,
                    trim: true
                },
                image_kit_url: {
                    type: String,
                    required: true,
                    trim: true
                }
            },
            report: {
                image_kit_id: {
                    type: String,
                    trim: true
                },
                image_kit_url: {
                    type: String,
                    trim: true
                }
            }
        }
    }],
}, { versionKey: false, timestamps: true })

const carModel = mongoose.model('carModel', carSchema, 'elecity_cars')

export default carModel