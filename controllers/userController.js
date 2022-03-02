import userModel from "../models/userModel.js"

export const getUsers = async (_, res) => {
	const users = await userModel.find({})
	res.status(200).send(users)
}

export const getUser = async (req, res) => {
	const user = await userModel.findById(req.params.id)
	if (!user) res.status(404).send('Unkown user')
	res.status(200).send(user)
}

export const addUser = async (req, res) => {
	const user = await userModel(req.body)
	await user.save()
	res.status(200).send(user)
}

export const updateUser = async (req, res) => {
	const user = await userModel.findByIdAndUpdate(req.params.id, req.body)
	if (!user) res.status(404).send('Unkown user')
	await user.save()
	res.status(200).send(user)
}

export const deleteUser = async (req, res) => {
	const user = await userModel.findByIdAndDelete(req.params.id, req.body)
	if (!user) res.status(404).send('Unkown user')
	res.status(200).send('User deleted')
}