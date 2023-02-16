const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const connectToDb = require('./config/db')
const fileUpload = require('express-fileupload')

const app = express()

dotenv.config({ path: './config/config.env' })
connectToDb()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const routes = require('./routes')

app.use(mongoSanitize())

// Prevent XSS attacks
app.use(xss())

// Prevent http param pollution
app.use(hpp())
//== Cors ==//
const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    // createParentPath: true,
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true,
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    limitHandler: (req, res, next) => {
      res.status(413).json({
        status: 'error',
        message: 'File too large',
        data: [],
      })
      next()
    },
  })
)
//=== mount route files ===//
app.use('/api', routes);

const PORT = process.env.PORT || 8000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

process.on('unhandledRejection', err => {
  console.error(err)
  console.error(err.name, err.message)
  console.log('UNHANDLED REJECTION! 😞 Shutting down Server...')
  // process.exit(1)
})
