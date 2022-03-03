import express from 'express'
import { getUsers, getUser, addUser,updateUser, deleteUser } from '../controllers/userController.js'
import { getCars, getCar, addCar, updateCar, deleteCar } from '../controllers/carController.js'
import { getOffers, getOffer, addOffer, updateOffer, deleteOffer } from '../controllers/offerController.js'
import { getRent, getRents, addRent, updateRent, deleteRent } from '../controllers/rentController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/', (_, res) => res.status(200).send('Server OK') /* #swagger.tags = ['API root'] */)

// users

router.get('/users', catchErrors(getUsers)
/*
	#swagger.tags = ['Users']
	#swagger.security = [{
		"bearerAuth": []
	}]
*/
)
router.get('/users/:id', catchErrors(getUser) /* #swagger.tags = ['Users'] */)
router.post('/users', catchErrors(addUser) /* #swagger.tags = ['Users'] */)
router.patch('/users/:id', catchErrors(updateUser) /* #swagger.tags = ['Users'] */)
router.delete('/users/:id', catchErrors(deleteUser) /* #swagger.tags = ['Users'] */)

// cars

router.get('/cars', catchErrors(getCars) /* #swagger.tags = ['Cars'] */)
router.get('/cars/:id', catchErrors(getCar) /* #swagger.tags = ['Cars'] */)
router.post('/cars', catchErrors(addCar) /* #swagger.tags = ['Cars'] */)
router.patch('/cars/:id', catchErrors(updateCar) /* #swagger.tags = ['Cars'] */)
router.delete('/cars/:id', catchErrors(deleteCar) /* #swagger.tags = ['Cars'] */)

// offers 

router.get('/offers', catchErrors(getOffers) /* #swagger.tags = ['Offers'] */)
router.get('/offers/:id', catchErrors(getOffer) /* #swagger.tags = ['Offers'] */)
router.post('/offers', catchErrors(addOffer) /* #swagger.tags = ['Offers'] */)
router.patch('/offers/:id', catchErrors(updateOffer) /* #swagger.tags = ['Offers'] */)
router.delete('/offers/:id', catchErrors(deleteOffer) /* #swagger.tags = ['Offers'] */)

// rents

router.get('/rents/:id', catchErrors(getRent) /* #swagger.tags = ['Rents'] */)
router.get('/rents', catchErrors(getRents) /* #swagger.tags = ['Rents'] */)
router.post('/rents', catchErrors(addRent) /* #swagger.tags = ['Rents'] */)
router.patch('/rents/:id', catchErrors(updateRent) /* #swagger.tags = ['Rents'] */)
router.delete('/rents/:id', catchErrors(deleteRent) /* #swagger.tags = ['Rents'] */)

export default router