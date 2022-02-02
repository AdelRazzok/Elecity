import userModel from "../models/userModel.js"

export const getUsers = async (_, res) => {
	try {
		const users = await userModel.find({})
		res.send(users)
	} catch (err) {
		console.log(err)
	}
}

// Create User

export const addUser = async (req, res) => {
	try {
		const user = userModel(req.body)
		await user.save()
		res.send(user)
	} catch (err) {
		console.log(err)
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

