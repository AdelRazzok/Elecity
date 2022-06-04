import mongoose from 'mongoose'

const offerSchema = new mongoose.Schema({
	offer_name: {
		type: String,
		required: true,
		trim: true,
	},
	offer_model: {
		type: String,
		required: true,
		trim: true,
	},
	offer_brand: {
		type: String,
		required: true,
		trim: true,
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
	},
	offer_image: {
		main: {
			image_kit_id: {
				type: String,
				required: true,
				trim: true,
			},
			image_kit_url: {
				type: String,
				required: true,
				trim: true,
			}
		},
		front: {
			image_kit_id: {
				type: String,
				required: true,
				trim: true,
			},
			image_kit_url: {
				type: String,
				required: true,
				trim: true,
			}
		},
		side: {
			image_kit_id: {
				type: String,
				required: true,
				trim: true,
			},
			image_kit_url: {
				type: String,
				required: true,
				trim: true,
			}
		},
		back: {
			image_kit_id: {
				type: String,
				required: true,
				trim: true,
			},
			image_kit_url: {
				type: String,
				required: true,
				trim: true,
			}
		},
	},
	offer_specs: {
		engine: {
			type: String,
			required: true,
			trim: true,
		},
		gearbox: {
			type: String,
			required: true,
			trim: true,
		},
		seats: {
			type: Number,
			required: true,
			trim: true,
		},
		doors: {
			type: Number,
			required: true,
			trim: true,
		},
		autonomy: {
			type: String,
			required: true,
			trim: true,
		}
	}

}, {versionKey: false, timestamps: true})

const offerModel = mongoose.model('offerModel', offerSchema, 'elecity_offers')

export default offerModel