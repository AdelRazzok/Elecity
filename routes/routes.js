import express from 'express'
import { catchErrors } from '../helpers.js'
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/users', catchErrors(getUsers))
router.get('/users/:id', catchErrors(getUser))
router.post('/users', catchErrors(addUser))
router.patch('/users/:id', catchErrors(updateUser))
router.delete('/users/:id', catchErrors(deleteUser))

export default router