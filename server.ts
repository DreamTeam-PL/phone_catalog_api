import express from 'express'
import { Server } from 'http'
import productsRouter from './src/Routes/products'
const db = require('./src/utils/db')
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const server = new Server(app)
const port = process.env.PORT || 80

app.use(cors())
app.use('/product/', express.json(), productsRouter)
app.get('/', (req, res) => res.send('DreamsTeam Api'))

db.connect().then(() =>
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
)
