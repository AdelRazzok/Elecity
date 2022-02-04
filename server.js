import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import routes from './routes/routes.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: '*',
    options: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-type,token'
}))

app.use(express.json())

mongoose.connect(process.env.MONGODB)

passport.use(
	new Strategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromHeader('token')
		},
		async (token, done) => {
			try {
				return done(null, token)
			} catch (err) {
				done(err)
			}
		}
	)
)

app.use('/api/v1', passport.authenticate('jwt', { session: false }), routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))