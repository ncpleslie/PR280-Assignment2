const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const routes = require('./routes/main-routes')
const controllers = require('./controllers/main')
app.use(fileUpload())

app.use(bodyParser.urlencoded({ extended: false }))

// Public stuff like CSS
app.use(express.static(path.join(__dirname, 'public')))

// Standard '/' root route
app.use(routes)

// Redirect all 404 routes => '/'
app.use(controllers.get404)

app.listen(8080)
