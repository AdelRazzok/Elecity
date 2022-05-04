import express from 'express'
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController.js'
import { getCars, getCar, addCar, updateCar, deleteCar } from '../controllers/carController.js'
import { getOffers, getOffer, addOffer, updateOffer, deleteOffer } from '../controllers/offerController.js'
import { getRent, getRents, addRent, updateRent, deleteRent } from '../controllers/rentController.js'
import { upload } from '../upload.js'
import { getFile, uploadFile, deleteFile } from '../controllers/fileController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

/* ========== API Root ========== */
router.get('/', (_, res) => res.status(200).send('Welcome to Elecity API')
	/*
		#swagger.tags = ['API root']
		#swagger.responses[200] = { description: 'The API is working' }
		#swagger.responses[500] = { description: 'The API is down / on maintenance' }
	*/
)

/* ========== Users Endpoints ========== */
router.get('/users', catchErrors(getUsers)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Return all users' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.get('/users/:id', catchErrors(getUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Return the user with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.post('/users', catchErrors(addUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"bearerAuth": []
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
router.patch('/users/:id', catchErrors(updateUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Update the user with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.delete('/users/:id', catchErrors(deleteUser)
	/*
		#swagger.tags = ['Users']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Delete the user with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)

/* ========== Cars Endpoints ========== */
router.get('/cars', catchErrors(getCars)
	/*
		#swagger.tags = ['Cars']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Return all cars' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.get('/cars/:id', catchErrors(getCar)
	/*
		#swagger.tags = ['Cars']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Return the car with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.post('/cars', catchErrors(addCar)
	/*
		#swagger.tags = ['Cars']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.requestBody = {
			required: true,
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/car"
					}  
				}
			}
			}
		#swagger.responses[200] = { description: 'Create a new car' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.patch('/cars/:id', catchErrors(updateCar)
	/*
		#swagger.tags = ['Cars']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Update the car with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.delete('/cars/:id', catchErrors(deleteCar)
	/*
		#swagger.tags = ['Cars']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Delete the car with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)

/* ========== Offers Endpoints ========== */
router.get('/offers', catchErrors(getOffers)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Return all offers' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.get('/offers/:id', catchErrors(getOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Create a new offer' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.post('/offers', catchErrors(addOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.requestBody = {
			required: true,
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/offer"
					}  
				}
			}
			}
		#swagger.responses[200] = { description: 'Delete the car with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.patch('/offers/:id', catchErrors(updateOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Update the offer with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.delete('/offers/:id', catchErrors(deleteOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Delete the offer with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)

/* ========== Rents Endpoints ========== */
router.get('/rents', catchErrors(getRents)
	/*
		#swagger.tags = ['Rents']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Update the offer with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.get('/rents/:id', catchErrors(getRent)
	/*
		#swagger.tags = ['Rents']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Return the rent with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.post('/rents', catchErrors(addRent)
	/*
		#swagger.tags = ['Rents']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.requestBody = {
			required: true,
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/rent"
					}  
				}
			}
			}
		#swagger.responses[200] = { description: 'Create a new rent' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.patch('/rents/:id', catchErrors(updateRent)
	/*
		#swagger.tags = ['Rents']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Update the rent with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.delete('/rents/:id', catchErrors(deleteRent)
	/*
		#swagger.tags = ['Rents']
		#swagger.security = [{
			"bearerAuth": []
		}]
		#swagger.responses[200] = { description: 'Delete the rent with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)

/* ========== Files Endpoints ========== */

router.get('/files/:filename', catchErrors(getFile))

router.post('/files', upload.single('file'), catchErrors(uploadFile))

router.delete('/files/:id', catchErrors(deleteFile))

export default router