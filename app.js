/*
 * @Author: Nokey 
 * @Date: 2017-12-31 19:43:53 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-15 15:51:12
 */
'use strict'; 

// Core
require('colors')
const http    = require('http')
const https   = require('https')
const express = require('express')
const app     = express()
const path    = require('path')
const fs      = require('fs')
const config  = require('./config')

// Middlewares
const favicon       = require('serve-favicon')
const morgan        = require('morgan') // HTTP Request logger
const session       = require('express-session')
const RedisStore    = require('connect-redis')(session)
const redis_client  = require('./common/redisClient')
const bodyParser    = require('body-parser')
const compression   = require('compression')
const cors          = require('cors')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const multer        = require('multer')
const upload        = multer({
    dest: config.upload_path,
    limits: {
        files: 5
    }
})

// Environments
app.set('port', process.env.NODE_ENV === 'production' ? 80 : 3000)
app.set('env', process.env.NODE_ENV === 'production' ? 'production' : 'development')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Use Middlewares
app.use(morgan(`${'||> :method :url :status :response-time ms <||'.magenta} :remote-addr :referrer`))
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(express.static(config.public_path))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(upload.none())
app.use(session({
    secret: 'Garfield cat',
    name: 'G.SID',
    resave: false,
    saveUninitialized: true,
    rolling: true,  // refresh session on every response
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 3600000,
        secure: false
    },
    store: new RedisStore({
        client: redis_client
    })
}))

/*****  Passport Config  *****/
app.use(passport.initialize())
app.use(passport.session())

const Users = require('./models/User')
passport.use(new LocalStrategy(Users.authenticate()))
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())
/*****  END: Config  *****/

// CORS config
let corsOptions = null
if ('development' !== app.get('env')) {
    corsOptions = {
        origin: config.cors.white_list
    }
} else {
    corsOptions = {
        origin: [/127\.0\.0\.1:3000/, /localhost:3000/]
    }
}

/**
 * Routes
 */
let pages = require('./routes/pages'),
    api = require('./routes/api')

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
        error: app.get('env') === 'development' ? err : {}
    })
})

// HTTP Server
const server_http = http.createServer(app)
server_http.listen(app.get('port'), () => {
    console.info('App Env: ' + app.get('env') + app.get('port'))
    console.info(corsOptions)
    console.info('Express HTTP server listening on port ' + app.get('port'))
})

// HTTPS Server
// const options = {
//     key: fs.readFileSync(config.https.key),
//     cert: fs.readFileSync(config.https.cert),
//     ca: fs.readFileSync(config.https.ca)
// }
// const server_https = https.createServer(options, app);
// server_https.listen(443, () => {
//     console.info('Express HTTPS server listening on port 443');
// })

// module.exports = app
