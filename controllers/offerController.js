import offerModel from "../models/offerModel.js"

// Get Offers
export const getOffers = async (_, res) => {
	const offers = await offerModel.find({})
	res.status(200).send(offers)
}

// Create Offer
export const addOffer = async (req, res) => {
	const offer = await offerModel(req.body)
	await offer.save()
	res.status(200).send(offer)
}

// Update Offer
export const updateOffer = async (req, res) => {
	const offer = await offerModel.findByIdAndUpdate(req.params.id, req.body)
	if (!offer) {
		res.status(404).send('offer unkown')
	}
	await offer.save()
	res.status(200).send(offer)
}

// Delete Offer
export const deleteOffer = async (req, res) => {
	const offer = await offerModel.findByIdAndDelete(req.params.id, req.body)
	if (!offer) {
		res.status(404).send('offer unknow')
	}
}