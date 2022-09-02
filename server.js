import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()
import router from './routes/routes.js'
import './config/passport.js'

const swaggerFile = JSON.parse(await readFile(new URL('./swagger-output.json', import.meta.url)))
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
	origin: '*',
	options: 'GET,POST,PATCH,DELETE',
	allowedHeaders: 'Content-type,Authorization,token',
	credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/api/v1', router)
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))

export default app

