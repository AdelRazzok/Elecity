import PlatformModel from '../models/platformModel.js'
import Mongoose from 'mongoose'
import moment from 'moment'
import CarModel from '../models/carModel.js'

export const getAvailableCars = async (req, res) => {
  if (req.headers.token && req.headers.token === process.env.API_KEY) {
    const city = req.params.city.replaceAll('&', ' ')
    const platforms = await PlatformModel.find({
      'address.city': city
    })
      .populate({
        path: 'cars',
        match: {
          available: true,
          'offer._id': req.params.offerId,
          // checks that rents array do not contain a rent ( { ...rent, start_date, end_date } ) that overlaps with the requested period
          $or: [
            { rents: { $size: 0 } },
            {
              $and: [{
                rents: {
                  $elemMatch: {
                    $or: [
                      { start_date: { $gt: moment(req.params.end_date).add(30, 'minutes').toISOString() } },
                      { end_date: { $lt: moment(req.params.start_date).subtract(30, 'minutes').toISOString() } }
                    ]
                  }
                }
              }, {
                rents: {
                  $not: {
                    $elemMatch: {
                      $or: [
                        { start_date: { $gt: moment(req.params.start_date).subtract(30, 'minutes').toISOString(), $lt: moment(req.params.end_date).add(30, 'minutes').toISOString() } },
                        { end_date: { $lte: moment(req.params.end_date).add(30, 'minutes').toISOString(), $gt: moment(req.params.start_date).subtract(30, 'minutes').toISOString() } }
                      ]
                    }
                  }
                }
              }]
            }
          ]
        }
      })
      .exec((err, platforms) => {
        if (err) res.status(500).send(err)
        res.status(200).send(platforms)
      })
  } else {
    res.status(401).send('Unauthorized')
  }
}

export const addRent = async (req, res) => {
  if (req.headers.token && req.headers.token === process.env.API_KEY) {
    // initialize boolean to check if rent went through
    let rentSuccess = false
    for (let i = 0; i < req.body.platform.cars.length; i++) {
      const car_element = req.body.platform.cars[i]
      const car_result = await CarModel.find({
        _id: Mongoose.Types.ObjectId(car_element._id),
        $or: [
          { rents: { $size: 0 } },
          {
            $and: [{
              rents: {
                $elemMatch: {
                  $or: [
                    { start_date: { $gt: moment(req.body.rent_params.end_date).add(30, 'minutes').toISOString() } },
                    { end_date: { $lt: moment(req.body.rent_params.start_date).subtract(30, 'minutes').toISOString() } }
                  ]
                }
              }
            }, {
              rents: {
                $not: {
                  $elemMatch: {
                    $or: [
                      { start_date: { $gt: moment(req.body.rent_params.start_date).subtract(30, 'minutes').toISOString(), $lt: moment(req.body.rent_params.end_date).add(30, 'minutes').toISOString() } },
                      { end_date: { $lte: moment(req.body.rent_params.end_date).add(30, 'minutes').toISOString(), $gt: moment(req.body.rent_params.start_date).subtract(30, 'minutes').toISOString() } }
                    ]
                  }
                }
              }
            }]
          }
        ]
      })
      if (car_result.length !== 0) {
        const car = car_result[0]
        const rent_id = Mongoose.Types.ObjectId()
        const rent_infos = {
          ...req.body.rent_params,
          _id: rent_id
        }
        if (!car.rents) {
          car.rents = [rent_infos]
        } else {
          car.rents.push(rent_infos)
        }
        await car.save()
        const rented_car = await CarModel.find({
          _id: Mongoose.Types.ObjectId(car_element._id)
        }, {
          rents: {
            $elemMatch: {
              _id: Mongoose.Types.ObjectId(rent_id)
            }
          }
        })
        res.status(200).send(rented_car)
        rentSuccess = true
        break
      }
    }
    if (!rentSuccess) {
      res.status(500).send('No car available')
    }
  } else {
    res.status(401).send('Unauthorized')
  }
}

// export const updateRent = async (req, res) => {
// 	if (req.headers.token && req.headers.token === process.env.API_KEY) {
// 		const car = await carModel.findById(req.params.id)
// 		if (!car) res.status(404).send('Unknow car model')
// 		const rent = car.rents.id(req.body.rent_id)
// 		if (!rent) res.status(404).send('Unknow rent')
// 		for (const key in req.body) {
// 			rent[key] = req.body[key]
// 		}
// 		await car.save()
// 		res.status(200).send(car)
// 	} else {
// 		res.status(401).send('Unauthorized')
// 	}
// }

// export const addIncident = async (req, res) => {
// 	if (req.headers.token && req.headers.token === process.env.API_KEY) {
// 		const car = await carModel.findById(req.params.id)
// 		if (!car) res.status(404).send('Unknow car model')
// 		const incident = {
// 			_id: new mongoose.Types.ObjectId(),
// 			signal_date: req.body.signal_date,
// 			details: req.body.details,
// 			photo:{
// 				image_kit_id: req.body.photo.image_kit_id,
// 				image_kit_url: req.body.photo.image_kit_url,
// 			}
// 		}
// 		car.incidents.push(incident)
// 		await car.save()
// 		res.status(200).send(car)
// 	} else {
// 		res.status(401).send('Unauthorized')
// 	}
// }

// export const updateIncident = async (req, res) => {
// 	if (req.headers.token && req.headers.token === process.env.API_KEY) {
// 		const car = await carModel.findById(req.params.id)
// 		if (!car) res.status(404).send('Unknow car model')
// 		const incident = car.incidents.id(req.body.incident_id)
// 		if (!incident) res.status(404).send('Unknow incident')
// 		for (const key in req.body) {
// 			incident[key] = req.body[key]
// 		}
// 		await car.save()
// 		res.status(200).send(car)
// 	} else {
// 		res.status(401).send('Unauthorized')
// 	}
// }