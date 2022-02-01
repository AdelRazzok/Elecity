import mongoose from 'mongoose'

const userSchema = new mongoose.Schema ({

  

})

// (params: Nom du modèle, Schéma de référence, nom de la collection)
const userModel = mongoose.model('userModel', userSchema, 'elecity_users')




export default userModel