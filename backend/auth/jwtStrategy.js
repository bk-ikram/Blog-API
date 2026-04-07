require('dotenv').config({path: '../../.env'});

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


async function verify(jwt_payload, done) {
    try{
        const userId = jwt_payload.sub;
        const user = await getUserById(userId);
        if(!user) {
             return done(null, false)
        }
        return done(null, user);
    }
    catch(err){
        return done(err);
    }

}

const strategy = new JwtStrategy(opts,verify);

passport.use(strategy);