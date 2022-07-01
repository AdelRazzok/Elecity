import express from 'express'
import users from './users.js'
import cars from './cars.js'
import offers from './offers.js'
import files from './files.js'
import platforms from './platforms.js'
import rents from './rents.js'

const router = express.Router()

router.get('/', (_, res) => res.status(200).json({ message: 'Welcome to Elecity API', running: true })
/*
	#swagger.tags = ['API root']
	#swagger.responses[200] = { description: 'The API is working' }
	#swagger.responses[500] = { description: 'The API is down / on maintenance' }
*/
)
router.use('/users', users)
router.use('/cars', cars)
router.use('/offers', offers)
router.use('/files', files)
router.use('/platforms', platforms)
router.use('/rents', rents)

export default router