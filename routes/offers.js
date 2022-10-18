import express from 'express'
import { getOffers, getOffer, addOffer, updateOffer, deleteOffer } from '../controllers/offerController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/', catchErrors(getOffers)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Return all offers' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.get('/:id', catchErrors(getOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Create a new offer' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.post('/', catchErrors(addOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"ApiTokenAuth": []
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
router.patch('/:id', catchErrors(updateOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Update the offer with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
router.delete('/:id', catchErrors(deleteOffer)
	/*
		#swagger.tags = ['Offers']
		#swagger.security = [{
			"ApiTokenAuth": []
		}]
		#swagger.responses[200] = { description: 'Delete the offer with the param ID' }
		#swagger.responses[401] = { description: 'Error : unauthorized access' }
	*/
)
export default router