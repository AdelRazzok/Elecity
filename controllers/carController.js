import carModel from "../models/carModel.js"

// Get Cars
export const getCars = async (_, res) => {
	const cars = await carModel.find({})
	res.status(200).send(cars)
}

// Create Car
export const addCar = async (req, res) => {
	const car = await carModel(req.body)
	await car.save()
	res.status(200).send(car)
}

// Update Car
export const updateCar = async (req, res) => {
	const car = await carModel.findByIdAndUpdate(req.params.id, req.body)
	if (!car) {
		res.status(404).send('car model unkown')
	}
	await car.save()
	res.status(200).send(car)
}

// Delete car
export const deleteCar = async (req, res) => {
	const car = await carModel.findByIdAndDelete(req.params.id, req.body)
	if (!car) {
		res.status(404).send('car model unknow')
	}
}