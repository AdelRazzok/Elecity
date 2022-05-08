import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/routes.js'
import './config/passport.js'
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'
import MethodOverride from 'method-override'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()

const swaggerFile = JSON.parse(await readFile(new URL('./swagger-output.json', import.meta.url)))
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
	origin: '*',
	options: 'GET,POST,PATCH,DELETE',
	allowedHeaders: 'Content-type,Authorization',
	credentials: true
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(MethodOverride('_method'))

mongoose.connect(process.env.MONGODB)

app.use('/api/v1', router)
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))

export default app