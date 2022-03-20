/*
 * @Author: Nokey 
 * @Date: 2017-12-31 19:43:53 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 02:27:19
 */
'use strict'; 

// core
require('colors')
const http  = require('http')
const https = require('https')
const path  = require('path')
const fs    = require('fs')

// env & config
const dotenv = require('dotenv')
const new_env = dotenv.config({path: path.resolve(process.env.HOME, 'harbour/.env')})
const config  = require('./config')
const IS_PROD = process.env.NODE_ENV === 'production'
console.info(new_env.parsed)

// express & middlewares
const express     = require('express')
const app         = express()
const favicon     = require('serve-favicon')
const morgan      = require('morgan') // HTTP Request logger
const compression = require('compression')
const cors        = require('cors')
const multer      = require('multer')
const upload      = multer({
    dest: config.upload_path,
    limits: {
        files: 5
    }
})

// Environments
app.set('port', IS_PROD ? 80 : 3000)
app.set('https_port', IS_PROD ? 443 : 4433)
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

/*****  JWT Config  *****/

const jwt_opts = {
    secretOrKey: process.env.JWT_SECRET_OR_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
}

/*****  END: Config  *****/

// CORS config
let corsOptions = null
if (IS_PROD) {
    corsOptions = {
        origin: process.env.WHITE_LIST.split(',')
    }
} else {
    corsOptions = {
        origin: '*'
    }
}

/**
 * Routes
 */
const pages = require('./routes/pages')
const api = require('./routes/api')
const admin = require('./routes/admin')

app.post('/api/*', cors(corsOptions), api)
app.post('/admin/*', cors(corsOptions), admin)
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

/**
 * HTTP Server
 */
const server_http = http.createServer(app)
server_http.listen(app.get('port'), () => {
    console.info(`App Env: ${app.get('env')} ${app.get('port')}`)
    console.info(corsOptions)
    console.info(`Express HTTP server listening on port: ${app.get('port')}`)
})

/**
 * HTTPS Server
 */
const options = {
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT)
    // ca: fs.readFileSync(process.env.HTTPS_CA)
}
const server_https = https.createServer(options, app)
server_https.listen(app.get('https_port'), () => {
    console.info(`Express HTTPS server listening on port: ${app.get('https_port')}`)
})

// module.exports = app
