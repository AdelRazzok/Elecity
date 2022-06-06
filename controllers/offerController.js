import offerModel from "../models/offerModel.js"
import { imageKitSDK } from '../helpers.js'

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

export const updateOfferImage = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const offer = await offerModel.findById(req.params.id)
		if (!offer) res.status(404).send('Unknown offer')
		if (typeof req.file === 'undefined') res.status(400).send('No file')

		const image_identifier = req.body.image_identifier
		const imagekit = imageKitSDK

		// check if image_identifier === 'main' || 'front' || 'side' || 'back'
		if (Object.keys(offer.offer_image).some(e => e === image_identifier)) {

			//delete old offer image
			imagekit.deleteFile(offer.offer_image[image_identifier].image_kit_id,
				function (err, response) {
					if (err) res.status(500).json(err)
				})

			//updload and update new offer image
			imagekit.upload({
				file: req.file.buffer,
				fileName: req.file.originalname,
			},
				function (err, response) {
					if (err) res.status(500).json(err)
					offer.offer_image[image_identifier].image_kit_id = response.fileId
					offer.offer_image[image_identifier].image_kit_url = response.url
					offer.save()
					res.status(200).send(offer)
				})
		}

	} else {
		res.status(401).send('Unauthorized')
	}
}