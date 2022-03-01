import mongoose from 'mongoose'

const offerSchema = new mongoose.Schema({	
	offer_name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
    offer_price: {
        type: String,
		required: true,
		trim: true,
		lowercase: true
    },
    offer_description: {
        type: String,
		required: true,
		trim: true,
		lowercase: true
    },
    offer_duration: {
        type: Number,
		required: true,
		trim: true,
		lowercase: true
    }
})

const offerModel  = mongoose.model('offerModel', offerSchema, 'elecity_offers')

export default offerModel