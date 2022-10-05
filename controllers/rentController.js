import PlatformModel from '../models/platformModel.js'
import Mongoose from 'mongoose'
import moment from 'moment'
import CarModel from '../models/carModel.js'
import { imageKitSDK, generateQR } from '../helpers.js'
import OfferModel from '../models/offerModel.js'

export const getAvailableCars = async (req, res) => {
  if (req.headers.token && req.headers.token === process.env.API_KEY) {
    const offers = await OfferModel.find({}).select('offer_name').lean()

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
      }).lean()
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

    // check if rent is on xx:00 or xx:30
    const start_minutes = moment(req.body.rent_params.start_date).minutes()
    const end_minutes = moment(req.body.rent_params.end_date).minutes()
    const rent_duration = moment(req.body.rent_params.end_date).diff(moment(req.body.rent_params.start_date), 'hours')

    if ((start_minutes != '0' && start_minutes != '30') || (end_minutes != '0' && end_minutes != '30') || (rent_duration != 1 && rent_duration != 8)) {
      res.status(500).send('Invalid rent schedule')
    }

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
        const offer = await OfferModel.findById(req.body.rent_params.offer_id, 'offer_name offer_price').lean()

        const price = rent_duration == 1 ? offer.offer_price.hour : offer.offer_price.day

        // QRCODE
        const api_route = `${process.env.API_BASE_URL}/rents/${rent_id}`
        const rent_qrcode = await generateQR(api_route)

        const rent_infos = {
          ...req.body.rent_params,
          price: price,
          qrcode: rent_qrcode,
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
        }).lean()
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

export const getRent = async (req, res) => {
  if (req.headers.token && req.headers.token === process.env.API_KEY) {
    const rent = await CarModel.find(
      {
        'rent._id': Mongoose.Types.ObjectId(req.params.id)
      },
      {
        rents: {
          $elemMatch: {
            _id: Mongoose.Types.ObjectId(req.params.id)
          }
        }
      }
    )
    res.status(200).send(rent)
  } else {
    res.status(401).send('Unauthorized')
  }
}

export const getUserRents = async (req, res) => {
  if (req.headers.token && req.headers.token === process.env.API_KEY) {
    const rents = await CarModel.find({
      rents: {
        $elemMatch: {
          user: {
            _id: Mongoose.Types.ObjectId(req.params.id)
          }
        }
      }
    })
    res.status(200).send(rents)
  } else {
    res.status(401).send('Unauthorized')
  }
}

export const deleteRent = async (req, res) => {
  if (req.headers.token && req.headers.token === process.env.API_KEY) {
    const car = await CarModel.findOne({
      rents: {
        $elemMatch: {
          _id: Mongoose.Types.ObjectId(req.params.id)
        }
      }
    })
    if (!car) res.status(404).send('No car found with this rent')
    const isRent = (rent) => rent._id.toString() === req.params.id
    const rent_index = car.rents.findIndex(isRent)
    if (rent_index === -1) {
      res.status(404).send('Unknow rent')
    } else {
      car.rents.splice(rent_index, 1)
      await car.save()
      res.status(200).send('Rent deleted')
    }
  } else {
    res.status(401).send('Unauthorized')
  }
}

export const addIncident = async (req, res) => {
  if (req.headers.token && req.headers.token === process.env.API_KEY) {
    const car = await CarModel.findById(req.params.id)
    if (!car) res.status(404).send('Unknow car model')
    // upload image to imagekit
    const imagekit = imageKitSDK
    imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    },
      (err, response) => {
        if (err) res.status(500).json(err)
        const incident = {
          _id: new Mongoose.Types.ObjectId(),
          signal_date: req.body.signal_date,
          details: req.body.details,
          photo: {
            image_kit_id: response.fileId,
            image_kit_url: response.url,
          }
        }
        car.incidents.push(incident)
        car.save()
        res.status(200).send(car)
      })
  } else {
    res.status(401).send('Unauthorized')
  }
}

// export const updateIncident = async (req, res) => {
// 	if (req.headers.token && req.headers.token === process.env.API_KEY) {
// 		const car = await CarModel.findById(req.params.id)
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