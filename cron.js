import moment from 'moment'
import schedule from 'node-schedule'
import CarModel from './models/carModel.js'
import cronLogsModel from './models/cronLogsModel.js'

const RestoreAvailableCars = async (fireDate) => {
  const job_moment = moment(fireDate)
  let checked_date
  if (job_moment.minutes() == 16) {
    checked_date = job_moment.minutes(0).seconds(0).milliseconds(0)
  } else if (job_moment.minutes() == 46) {
    checked_date = job_moment.minutes(30).seconds(0).milliseconds(0)
  } else {
    console.log('error')
  }
  // FAIRE UN POPULATE POUR RECUP UNE SEULE RENT
  const cars = await CarModel.find({
    rents: {
      $elemMatch: {
        has_started: false,
        start_date: checked_date.toISOString()
      }
    }
  })
  if (cars.length != 0) {
    let deleted_rents_count = 0
    for (let i = 0; i < cars.length; i++) {
      const rent_index = cars[i].rents.findIndex(rent => {
        if (rent.start_date.toISOString() == checked_date.toISOString()) {
          deleted_rents_count++
          return rent.start_date.toISOString() == checked_date.toISOString()
        }
      })
      cars[i].rents.splice(rent_index,1)
      await cars[i].save()
    }
    const deleted_rents_log = {
      message: `Reserved rents deleted : ${deleted_rents_count}\nAt this date : ${fireDate}`,
      count: deleted_rents_count,
      date: checked_date
    }
    const saved_log = await cronLogsModel(deleted_rents_log)
		await saved_log.save()
    console.log(deleted_rents_log.message)
  }
}

export const Restore_Available_Cars_CRON = schedule.scheduleJob('16,46 * * * *', function (fireDate) {
  RestoreAvailableCars(fireDate)
})