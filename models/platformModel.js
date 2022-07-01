import mongoose from "mongoose"

const platformSchema = new mongoose.Schema({
	phone: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		street: {
			type: String,
			required: true,
			trim: true,

		},
		zipcode: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,

		}
	},
	cars: [{
		type: mongoose.Schema.Types.ObjectId,
		trim: true,
		ref: 'carModel',

	}]
}, { versionKey: false, timestamps: true })

const platformModel = mongoose.model("platformModel", platformSchema, 'electity_platforms')

export default platformModel