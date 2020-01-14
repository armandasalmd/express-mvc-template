import 'dotenv/config'
import express from 'express'
import { applyRoutes } from './routes'
import { connectToDatabase } from './models/index'

// import middleware
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

// init app
const PORT = process.env.PORT || 4001
const app = express()

// init database connection
connectToDatabase()

// init views
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// init middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(morgan('dev')) // request logger
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(cookieParser())

// init sessions
app.use(session({
	secret: "Shh, its a secret!",
	duration: (process.env.SESSION_DURATION || 10) * 60000,
	resave: true,
	saveUninitialized: true
}))

// applying routes
applyRoutes(app)

// page 404 when route was not found
// order matters. keep as last route
app.get('*', function (req, res) {
	res.redirect('/404.html');
});

// starting the server
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })