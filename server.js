import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import routes from './routes/routes.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cors({
    origin: '*',
    options: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-type,token'
}))

app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/api/v1', passport.authenticate('jwt', { session: false }), routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))