import mongoose from 'mongoose'

const rentSchema = new mongoose.Schema({	
	rent_date: {
		type: Date,
		required: true,
		trim: true,
		lowercase: true
	},
  	rent_finish: {
        type: Date,
		required: true,
		trim: true,
		lowercase: true
    },
    client_id: {
        type: Number,
		required: true,
		trim: true,
		lowercase: true
    },
    car_id: {
        type: Number,
		required: true,
		trim: true,
		lowercase: true
    }
})

const rentModel  = mongoose.model('rentModel', rentSchema, 'elecity_rents')

export default rentModel