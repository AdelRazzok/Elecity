import express from 'express'
import passport from 'passport'
import { register, login, getUserInfos, getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

// @route   POST api/v1/users/register
// @desc    Create a new user
// @access  Public
router.post('/register', catchErrors(register))

// @route   POST api/v1/users/login
// @desc    Check if the mail / password combination is correct
// @access  Public
router.post('/login', catchErrors(login))

// @route   GET api/v1/users/me
// @desc    Return the logged user's data
// @access  Private
router.get('/infos', passport.authenticate('jwt', { session: false }), catchErrors(getUserInfos))


/* ========== Admin Routes ========== */
router.get('/', catchErrors(getUsers)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Return all users' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.get('/:id', catchErrors(getUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Return the user with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.post('/', catchErrors(addUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.requestBody = {
			required: true,
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/user"
					}  
				}
			}
		}
		#swagger.responses[200] = { description: 'Create a new user' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.patch('/:id', catchErrors(updateUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Update the user with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.delete('/:id', catchErrors(deleteUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Delete the user with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
export default router