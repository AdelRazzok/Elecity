import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv'
dotenv.config()

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

export default passport