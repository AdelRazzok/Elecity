import express from 'express'
import { catchErrors } from '../helpers.js'
import { getUsers, addUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/', (_, res) => {
	res.send('Home page')
})

router.get('/users', catchErrors(getUsers))
router.post('/users', catchErrors(addUser))

router.route('/users/:id')
	.patch((req, res) => {
		res.send('Update user')
	})
	.delete((req, res) => {
		res.send('Delete user')
	})

export default router