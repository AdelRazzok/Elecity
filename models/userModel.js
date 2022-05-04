import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({	
	first_name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	last_name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	address: {
		street: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		zipcode: {
			type: Number,
			required: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		}
	},
	birth_date: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	phone: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	mail: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	role: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	}
}, {versionKey: false, timestamps: true})

const userModel  = mongoose.model('userModel', userSchema, 'elecity_users')

export default userModel