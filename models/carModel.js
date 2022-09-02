import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
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
    available: {
        type: Boolean,
        required: true,
        trim: true,
    },
    platform: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'platformModel',
        }
    },
    offer: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'offerModel',
        }
    },
    rents: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
        start_date: {
            type: Date,
            required: true,
            trim: true
        },
        end_date: {
            type: Date,
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
        platform: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                trim: true,
                ref: 'platformModel',
            }
        },
        user: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                trim: true,
                ref: 'userModel',
            }
        },
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
        }]
    }]
}, { versionKey: false, timestamps: true })

const carModel = mongoose.model('carModel', carSchema, 'elecity_cars')

export default carModel