import express from 'express'
import { getUsers, addUser,updateUser, deleteUser} from '../controllers/userController.js'
import { getCars, addCar, updateCar, deleteCar} from '../controllers/carController.js'
import { getOffers, addOffer, updateOffer, deleteOffer} from '../controllers/offerController.js'
import { catchErrors} from '../helpers.js'

const router = express.Router()

// users
router.get('/users', catchErrors(getUsers))
router.post('/users', catchErrors(addUser))
router.patch('/users/:id', catchErrors(updateUser))
router.delete('/users/:id', catchErrors(deleteUser))

// cars
router.get('/cars', catchErrors(getCars))
router.post('/cars', catchErrors(addCar))
router.patch('/cars/:id', catchErrors(updateCar))
router.delete('/cars/:id', catchErrors(deleteCar))

// offers 
router.get('/offers', catchErrors(getOffers))
router.post('/offers', catchErrors(addOffer))
router.patch('/offers/:id', catchErrors(updateOffer))
router.delete('/offers/:id', catchErrors(deleteOffer))


export default router

