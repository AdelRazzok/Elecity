import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })

/* ========== User auth / profile functions ========== */
export const registerUser = (async (req, res) => {
	const { first_name, last_name, birth_date, phone, mail, password, role } = req.body
	const { street, zipcode, city } = req.body.address
	const userExists = await User.findOne({ mail })

	if (userExists) {
		res.status(409)
		throw new Error('Duplicate mail')
	}

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
	const user = await User.create({
		first_name,
		last_name,
		address: {
			street,
			zipcode,
			city,
		},
		birth_date,
		phone,
		mail,
		password: hashedPassword,
		role
	})

	if (user) {
		await user.save()
		res.status(201).json({
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			address: {
				street: user.address.street,
				zipcode: user.address.zipcode,
				city: user.address.city,
			},
			birth_date: user.birth_date,
			phone: user.phone,
			mail: user.mail
		})
	} else {
		res.status(400).json({
			error: 'Données invalides'
		})
	}
})

export const loginUser = (async (req, res) => {
	const { mail, password } = req.body
	const user = await User.findOne({ mail })

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			token: generateToken(user._id)
		})
	} else {
		res.status(401).json({
			error: 'Email / Mot de passe incorrect'
		})
	}
})

export const getMe = (async (req, res) => {
	const { first_name, last_name, address, birth_date, phone, mail } = await User.findById(req.user._id)

	res.status(200).json({
		first_name: first_name,
		last_name: last_name,
		address: {
			street: address.street,
			zipcode: address.zipcode,
			city: address.city
		},
		birth_date: birth_date,
		phone: phone,
		mail: mail
	})
})

/* ========== Users admin functions ========== */
export const getUsers = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const users = await User.find({})
		res.status(200).send(users)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const getUser = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const user = await User.findById(req.params.id)
		if (!user) res.status(404).send('Unkown user')
		res.status(200).send(user)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const addUser = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const user = await User.create(req.body)
		await user.save()
		res.status(201).send(user)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const updateUser = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const user = await User.findByIdAndUpdate(req.params.id, req.body)
		if (!user) res.status(404).send('Unkown user')
		await user.save()
		res.status(200).send(user)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const deleteUser = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const user = await User.findByIdAndDelete(req.params.id, req.body)
		if (!user) res.status(404).send('Unkown user')
		res.status(200).send('User deleted')
	} else {
		res.status(401).send('Unauthorized')
	}
}