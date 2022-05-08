import express from 'express'
import users from './users.js'
import rents from './rents.js'
import cars from './cars.js'
import offers from './offers.js'

const router = express.Router()

router.get('/', (_, res) => res.status(200).json({ message: 'Welcome to Elecity API' })
/*
	#swagger.tags = ['API root']
	#swagger.responses[200] = { description: 'The API is working' }
	#swagger.responses[500] = { description: 'The API is down / on maintenance' }
*/
)
router.use('/users', users)
router.use('/rents', rents)
router.use('/cars', cars)
router.use('/offers', offers)

export default router