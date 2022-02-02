import express from 'express'
import { getUsers, addUser,updateUser, deleteUser} from '../controllers/userController.js'
import { catchErrors} from '../helpers.js'

const router = express.Router()

router.get('/users', catchErrors(getUsers))
router.post('/users', catchErrors(addUser))
router.patch('/users/:id', catchErrors(updateUser))
router.delete('/users/:id', catchErrors(deleteUser))

export default router

