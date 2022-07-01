import express from 'express'
import { addRent, getAvailableCars, getUserRents } from '../controllers/rentController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/available/:city/:offerId/:start_date/:end_date', catchErrors(getAvailableCars))

router.post('/', catchErrors(addRent))

router.get('/user/:id', catchErrors(getUserRents))

export default router