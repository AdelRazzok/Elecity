import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/userModel.js'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config()

const options = {
	secretOrKey: process.env.JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
	
passport.use(
	new Strategy(options, (jwt_payload, done) => {
		User.findById(jwt_payload.id, (err, user) => {
			if (err) return done(err, null)

			if (user) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		})
	})
)