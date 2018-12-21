/**
 * passportConfig
 * Configure passport strategy
*/

// Node Modules


// NPM Modules
import * as passport from 'passport'
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'


// Local Modules
import { Login } from './../../lib/users/users.login'
import { StatusMessage } from '../../types/server'
import { jwtSecret } from './../../lib/connection'

// Constants and global variables
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: jwtSecret,
    audience: 'localhost'
}
passport.use(new Strategy( opts, function(username, password, done) {
        new Login({username, plaintextPassword: password}).authenticate()
        .then((userLoggedIn: StatusMessage) => {
            return done(null, userLoggedIn.details)
        }, (userDidNotLogin: StatusMessage) => {
            return done(null, false, {message: userDidNotLogin.message})
        })
        .catch((err: StatusMessage) => {
            return done(null, false, {message: err.message})
        })
    }
))
