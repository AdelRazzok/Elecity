import rentModel from "../models/rentModel.js"

export const getRents = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const rents = await rentModel.find({})
		res.status(200).send(rents)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const getRent = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const rent = await rentModel.findById(req.params.id)
		if (!rent) res.status(404).send('Unkown rent')
		res.status(200).send(rent)
	} else {
		res.status(401).send('Unauthorized')
	}
}
export const addRent = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const rent = await rentModel(req.body)
		await rent.save()
		res.status(200).send(rent)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const updateRent = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const rent = await rentModel.findByIdAndUpdate(req.params.id, req.body)
		if (!rent) res.status(404).send('Unknown rent')
		await rent.save()
		res.status(200).send(rent)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const deleteRent = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const rent = await rentModel.findByIdAndDelete(req.params.id, req.body)
		if (!rent) res.status(404).send('Unknown rent')
		res.status(200).send('User deleted')
	} else {
		res.status(401).send('Unauthorized')
	}
}