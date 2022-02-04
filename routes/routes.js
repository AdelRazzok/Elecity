import express from 'express'
import { getUsers, addUser,updateUser, deleteUser, getUser} from '../controllers/userController.js'
import { getCars, addCar, updateCar, deleteCar} from '../controllers/carController.js'
import { getOffers, addOffer, updateOffer, deleteOffer} from '../controllers/offerController.js'
import { getRent, getRents, addRent, updateRent, deleteRent} from '../controllers/rentController.js'
import { catchErrors} from '../helpers.js'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'



const router = express.Router()

const swaggerOptions = {

    swaggerDefinition: {
        info : {
            title: 'ELECITY-API',
            version: '1.0.0'
        }
    },
    apis: ['server.js'],
}


// users
const swaggerDocs = swaggerJsDoc(swaggerOptions)
console.log(swaggerDocs)
/**
 * @swagger
 * /users:
 *   get:
 *    description: Get all users
 *    responses: 
 *      200:
 *        description: Success
 * 
 */
router.get('/users', catchErrors(getUsers))
router.get('/users/:id', catchErrors(getUser))
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

// rents
router.get('/rents/:id', catchErrors(getRent))
router.get('/rents', catchErrors(getRents))
router.post('/rents', catchErrors(addRent))
router.patch('/rents/:id', catchErrors(updateRent))
router.delete('/rents/:id', catchErrors(deleteRent))


export default router