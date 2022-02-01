import express from 'express'
import { getUsers } from '../controllers/userController.js'

const router = express.Router()

router.route('/')
	.get((_, res) => {
		res.send('Home page')
	})

router.route('/users')
	.get(getUsers)
	.post((req, res) => {
		res.send('Add user')
	})
	.put((req, res, next, id) => {
		res.send('Update user')
	})
	.delete((req, res, next, id) => {
		res.send('Delete user')
	})

export default router