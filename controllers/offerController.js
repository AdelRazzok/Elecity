import offerModel from "../models/offerModel.js"

export const getOffers = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const offers = await offerModel.find({})
		res.status(200).send(offers)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const getOffer = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const offer = await offerModel.findById(req.params.id)
		if (!offer) res.status(404).send('Unkown offer')
		res.send(offer)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const addOffer = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const offer = await offerModel(req.body)
		await offer.save()
		res.status(200).send(offer)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const updateOffer = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const offer = await offerModel.findByIdAndUpdate(req.params.id, req.body)
		if (!offer) res.status(404).send('Unknown offer')
		await offer.save()
		res.status(200).send(offer)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const deleteOffer = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const offer = await offerModel.findByIdAndDelete(req.params.id, req.body)
		if (!offer) res.status(404).send('Unknown offer')
		res.status(200).send(offer)
	} else {
		res.status(401).send('Unauthorized')
	}
}