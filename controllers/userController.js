import userModel from "../models/userModel.js"

export const getUsers = async (_, res) => {
	try {
		const users = await userModel.find({})
		res.send(users)
	} catch (err) {
		console.log(err)
	}
}

export const addUser = async (req, res) => {
	try {
		const user = userModel(req.body)
		await user.save()
		res.send(user)
	} catch (err) {
		console.log(err)
	}
}