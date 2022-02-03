import rentModel from "../models/rentModel.js"

export const getRents = async (_, res) => {
	const rents = await rentModel.find({})
	res.status(200).send(rents)
}


export const getRent = async (req, res) => {
	const rent = await rentModel.findById(req.params.id)
	res.status(200).send(rent)
}
export const addRent = async (req, res) => {
	const rent = await rentModel(req.body)
	await rent.save()
	res.status(200).send(rent)
}

export const updateRent = async (req, res) => {
	const rent = await rentModel.findByIdAndUpdate(req.params.id, req.body)
	if (!rent) res.status(404).send('unknown rent')
	await rent.save()
	res.status(200).send(rent)
}

export const deleteRent = async (req, res) => {
	const rent = await rentModel.findByIdAndDelete(req.params.id, req.body)
	if (!rent) res.status(404).send('unknown rent')
	res.status(200).send('User deleted')
}