const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')
const logger = require('morgan')
const rfs = require('rotating-file-stream')
const router = require('./src/routes')
const config = require('./src/configs')
const app = express()

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

// view engine setup
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(flash())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'test123',
    name: 'secretname',
    cookie: {
        sameSite: true,
        // maxAge: 60000
    }
}))
app.use(logger('combined', {
    stream: accessLogStream
}))

// app.locals.strTok = require('./src/helpers/general').strTok

app.use((req, res, next) => {
    res.locals.query = req.query
    res.locals.session = req.session
    res.locals.strTok = require('./src/helpers/general').strTok
    res.locals.baseUrl = require('./src/helpers/general').baseUrl(req, config.port)
    res.locals.fullUrl = require('./src/helpers/general').fullUrl(req, config.port)
    res.locals.currentUrl = require('./src/helpers/general').currentUrl(req, config.port)
    next()
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.use(router)

app.listen(config.port, (err) => {
    if (err) {
        console.error(`App error`)
    } else {
        console.log(`App is up and running for ${config.env} environment | PORT: ${config.port}`)
    }
})
