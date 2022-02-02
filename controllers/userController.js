import userModel from "../models/userModel.js"

export const getUsers = async (_, res) => {
	const users = await userModel.find({})
	res.status(200).send(users)
}

// Create User

export const addUser = async (req, res) => {
	const user = await userModel(req.body)
	await user.save()
	res.status(200).send(user)
}

export const updateUser = async (req, res) => {
	const user = await userModel.findByIdAndUpdate(req.params.id, req.body)
	if (!user) {
		res.status(404).send('User unkown')
	}
	await user.save()
	res.status(200).send(user)
}

export const deleteUser = async (req, res) => {
	const user = await userModel.findByIdAndDelete(req.params.id, req.body)
	if (!user) {
		res.status(404).send('User unkown')
	}
}

// update User

export const updateUser = async (req, res) => {
 
    // body représente l'objet qu'on a envoyé
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body)
    // pour sauvegarder dans la base de données
    await user.save()
    res.send(user)
}

// delete User 

export const deleteUser = async (req, res) => {
 
    // body représente l'objet qu'on a envoyé
    const user = await userModel.findByIdAndDelete(req.params.id)
    // pour sauvegarder dans la base de données
   
	if (!user) {
        res.status(404).send('Aucun User trouvé.')
    }
    res.status(200).send('User deleted')

}

