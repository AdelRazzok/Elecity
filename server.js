import express from 'express'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import router from './routes/routes.js'
import './config/passport.js'
import { Restore_Available_Cars_CRON } from './cron.js'
Restore_Available_Cars_CRON

const swaggerFile = JSON.parse(await readFile(new URL('./swagger-output.json', import.meta.url)))
const PORT = process.env.PORT || 80
const app = express()

app.use(express.json())
app.use(cors({
	origin: '*',
	options: 'GET,POST,PATCH,DELETE',
	allowedHeaders: 'Content-type,Authorization,token',
	credentials: true
}))

mongoose.connect(process.env.MONGODB)

app.use('/api/v1', router)
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

import ngrok from 'ngrok'
(async function() {
  const url = await ngrok.connect()
  console.log(url)
})()

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))

export default app