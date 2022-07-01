import CarModel from "../models/carModel.js"
import Mongoose from "mongoose"
import PlatformModel from "../models/platformModel.js"

export const getCars = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const cars = await CarModel.find({})
		res.status(200).send(cars)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const getCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await CarModel.findById(req.params.id)
		if (!car) res.status(404).send('Unknow car')
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const addCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await CarModel(req.body)
		await car.save()
		// update platform with new car
		const platform = await PlatformModel.findById(req.body.platform._id)
		if (!platform.cars) {
			platform.cars = [car._id]
		} else {
			platform.cars.push(car._id)
		}
		await platform.save()
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const updateCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await CarModel.findByIdAndUpdate(req.params.id, req.body)
		if (!car) res.status(404).send('Unknow car model')
		await car.save()
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}

export const deleteCar = async (req, res) => {
	if (req.headers.token && req.headers.token === process.env.API_KEY) {
		const car = await CarModel.findByIdAndDelete(req.params.id)
		if (!car) res.status(404).send('Unknow car model')
		// Delete car from platform
		const platform = await PlatformModel.findById(car.platform._id.toString())
		platform.cars.pull(car._id.toString())
		await platform.save()
		res.status(200).send(car)
	} else {
		res.status(401).send('Unauthorized')
	}
}