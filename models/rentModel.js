import mongoose from 'mongoose'

const rentSchema = new mongoose.Schema({	
	rent_date: {
		type: Date,
		required: true,
	},
  	rent_finish: {
        type: Date,
		required: true,
    },
    client_id: {
        type: Number,
		required: true,
    },
    car_id: {
        type: Number,
		required: true,
    }
}, {versionKey: false, timestamps: true})

const rentModel  = mongoose.model('rentModel', rentSchema, 'elecity_rents')

export default rentModel