import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import routes from './routes/routes.js'


// Pour lancer dotenv
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: '*',
    options: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-type'
}))

app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/', (req, res) => {
	const accessToken = jwt.sign('auth-token', process.env.AUTH_TOKEN)
	res.json({ accessToken: accessToken })
})

app.use('/api/v1', routes)


mongoose.connect(process.env.MONGODB)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))