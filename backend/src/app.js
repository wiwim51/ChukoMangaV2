// import some node modules for later

const fs = require('node:fs')
const path = require('node:path')
const cookieParser = require('cookie-parser')

// create express app

const express = require('express')

const app = express()

// use some application-level middlewares

app.use(express.json()) // on remplie l'objet req.body avec les data envoyer du front ou postman

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.JWT_SECRET)) // on remplie l'objet req.cookies avec les data envoyer du front ou postman

const cors = require('cors')

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
    'Access-Control-Allow-Origin':
      process.env.FRONTEND_URL ?? 'http://localhost:5173',
    'Access-Control-Allow-Credentials': true,
    allowedHeaders: ['Authorization', 'Content-Type', 'sessionId'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
)
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
//     optionsSuccessStatus: 200,
//   }) // on donne les droit a au front de ce connecter
// )
// import and mount the API routes

const router = require('./router') // on importe notre routeur

app.use(router) // on envois la requet dans le fichier router.js

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, '../public')))

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  '..',
  '..',
  'frontend',
  'dist',
  'index.html'
)

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')))

  // redirect all requests to the REACT index file

  app.get('*', (req, res) => {
    res.sendFile(reactIndexFile)
  })
}

// ready to export

module.exports = app
