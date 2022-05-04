import mongoose from 'mongoose'

const offerSchema = new mongoose.Schema({
	offer_name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	offer_model: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	offer_price: {
		hour: {
			type: Number,
			required: true
		},
		day: {
			type: Number,
			required: true
		}
	},
	offer_description: {
		type: String,
		required: true,
		trim: true,
		// lowercase: true
	},
	offer_image: {
		main: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		front: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		side: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		back: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
	},
	offer_specs: {
		engine: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		gearbox: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		seats: {
			type: Number,
			required: true,
			trim: true,
			lowercase: true
		},
		doors: {
			type: Number,
			required: true,
			trim: true,
			lowercase: true
		},
		autonomy: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		}
	}

}, {versionKey: false, timestamps: true})

const offerModel = mongoose.model('offerModel', offerSchema, 'elecity_offers')

export default offerModel