/*
 * @Author: Nokey 
 * @Date: 2017-12-31 19:43:53 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-10 23:35:40
 */
'use strict'; 

// core
require('colors')
const http    = require('http')
const https   = require('https')
const path    = require('path')
const fs      = require('fs')

// env & config
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(process.env.HOME, 'harbour/.env')})
const config  = require('./config')
const IS_PROD = process.env.NODE_ENV === 'production'
console.log(process.env);

// express & middlewares
const express       = require('express')
const app           = express()
const favicon       = require('serve-favicon')
const morgan        = require('morgan') // HTTP Request logger
const compression   = require('compression')
const cors          = require('cors')
const passport      = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const multer        = require('multer')
const upload        = multer({
    dest: config.upload_path,
    limits: {
        files: 5
    }
})

// Environments
app.set('port', IS_PROD ? 80 : 3000)
app.set('env', IS_PROD ? 'production' : 'development')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Use Middlewares
app.use(morgan(`${'||> :method :url :status :response-time ms <||'.magenta} :remote-addr :referrer`))
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(express.static(config.public_path))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(upload.none())

/*****  Passport Config  *****/
app.use(passport.initialize())
// app.use(passport.session())

const User = require('./models/User')
// passport.use(new LocalStrategy(User.authenticate()))
// passport.use(User.createStrategy())
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

const jwt_opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_OR_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
}
passport.use(new JwtStrategy(jwt_opts, (jwt_payload, done)=>{
    User.findOne({id: jwt_payload.sub}, (err, user)=>{
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
/*****  END: Config  *****/

// CORS config
let corsOptions = null
if (IS_PROD) {
    corsOptions = {
        origin: config.cors.white_list
    }
} else {
    corsOptions = {
        origin: '*'
    }
}

/**
 * Routes
 */
let pages = require('./routes/pages'),
    api = require('./routes/api');

app.post('/api/*', cors(corsOptions), api)
app.get('/*', pages)

/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

/**
 * Error Handle
 */
app.use((err, req, res, next) => {
    console.error('HTTP', err.message)

    res.status(err.status || 500)
    res.render('error', {
        message: err.message,

        // Development error handler Will print stacktrace
        // Production error handler No stacktraces leaked to user
        error: IS_PROD ? {} : err
    })
})

// HTTP Server
const server_http = http.createServer(app)
server_http.listen(app.get('port'), () => {
    console.info(`App Env: ${app.get('env')} ${app.get('port')}`)
    console.info(corsOptions)
    console.info(`Express HTTP server listening on port: ${app.get('port')}`)
})

// HTTPS Server
if(IS_PROD){
    const options = {
        key: fs.readFileSync(process.env.HTTPS_KEY),
        cert: fs.readFileSync(process.env.HTTPS_CERT),
        ca: fs.readFileSync(process.env.HTTPS_CA)
    }
    const server_https = https.createServer(options, app)
    server_https.listen(443, () => {
        console.info('Express HTTPS server listening on port 443')
    })
}

// module.exports = app
