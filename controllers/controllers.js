import userModel from '../models/userModels.js'

export const getUsers = async (req, res) => {

    const Users = await userModel.find({})
    res.send(Users)

}
export const addUser = async (req, res) => {

    const user = userModel(req.body)
    await user.save()
    res.send(user)

}

