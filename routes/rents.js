import express from 'express'
import { addRent, deleteRent, getAvailableCars, getRent, getUserRents } from '../controllers/rentController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/available/:city/:offerId/:start_date/:end_date', catchErrors(getAvailableCars))

router.post('/', catchErrors(addRent))

router.get('/user/:id', catchErrors(getUserRents))

router.get('/:id', catchErrors(getRent))

router.delete('/:id', catchErrors(deleteRent))

export default router