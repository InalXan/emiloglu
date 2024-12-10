import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import connection from './db/conn.js'
import router from './router/index.js'
import { fileURLToPath } from 'url'
import path from 'path'
// host configure
const PORT = 5000
const server = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

server.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// morgan
server.use(morgan('dev'))
// cors error handler
server.use(cors({ origin: 'http://localhost:5173' }))
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded())

// parse application/json
server.use(bodyParser.json())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
// router
server.use(router)

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}` + ` ` + `Server running`)
  connection()
})
