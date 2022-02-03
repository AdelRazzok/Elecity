import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import routes from './routes/routes.js'
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/', (req, res) => {
	const accessToken = jwt.sign('auth-token', process.env.AUTH_TOKEN)
	res.json({ accessToken: accessToken })
})

app.use('/api/v1', routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))