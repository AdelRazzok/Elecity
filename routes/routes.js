import express from 'express'
import { getUsers, addUser,} from '../controllers/controllers.js'
import { catchErrors} from '../helpers.js'

const router = express.Router()

router.get('/',	(_, res) => {
	res.send('Home page') 

	})

router.route('/users')
	.get(catchErrors(getUsers))

	.post(catchErrors(addUser))

router.route('/users/:id')
	.patch((req, res, next, id) => {
		res.send('Update user')
	})
	.delete((req, res, next, id) => {
		res.send('Delete user')
	})

export default router