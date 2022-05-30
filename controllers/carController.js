import carModel from "../models/carModel.js"

export const getCars = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const cars = await carModel.find({})
		res.status(200).send(cars)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const getCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await carModel.findById(req.params.id)
		if (!car) res.status(404).send('Unknow car')
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const addCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await carModel(req.body)
		await car.save()
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const updateCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await carModel.findByIdAndUpdate(req.params.id, req.body)
		if (!car) res.status(404).send('Unknow car model')
		await car.save()
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const deleteCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await carModel.findByIdAndDelete(req.params.id, req.body)
		if (!car) res.status(404).send('Unknow car model')
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}