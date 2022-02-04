import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'
import routes from './routes/routes.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: '*',
    options: 'GET,POST,PATCH,DELETE',
    preflightContinue: true,
    allowedHeaders: 'Content-type, token'
}))

app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/api/v1', passport.authenticate('jwt', { session: false }), routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))