const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../db/userQueries');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'dinkelberg',
};

module.exports = new JwtStrategy(opts, async (payload, done) => {
    try{
        const user = await db.userFind(payload.user.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(err) {
        return done(err, false);
    }  
})