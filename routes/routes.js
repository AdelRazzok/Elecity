import express from 'express'

const router = express.Router()

router.route('/')
	.get((_, res) => {
		res.send('Home page')
	})

router.route('/users')
	.get((req, res) => {
		res.send('Get users')
	})
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