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
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
  }]
}, {versionKey: false, timestamps: true})

const platformModel = mongoose.model("platform", platformSchema, 'electity_platforms')

export default platformModel