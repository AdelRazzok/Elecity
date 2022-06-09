import platformModel from '../models/platformModel.js'

export const getPlatforms = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const platforms = await platformModel.find({})
		res.status(200).send(platforms)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const getPlatform = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const platform = await platformModel.findById(req.params.id)
		if (!platform) res.status(404).send('Unkown platform')
		res.status(200).send(platform)
	} else {
		res.status(401).send('Unauthorized')
	}
}
export const addPlatform = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const platform = await platformModel(req.body)
		await platform.save()
		res.status(200).send(platform)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const updatePlatform = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const platform = await platformModel.findByIdAndUpdate(req.params.id, req.body)
		if (!platform) res.status(404).send('Unknown platform')
		await platform.save()
		res.status(200).send(platform)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const deletePlatform = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const platform = await platformModel.findByIdAndDelete(req.params.id, req.body)
		if (!platform) res.status(404).send('Unknown platform')
		res.status(200).send('User deleted')
	} else {
		res.status(401).send('Unauthorized')
	}
}