import express from 'express'
import { Server } from 'http'
import ProductsRouter from './src/Routes/products'
import { connect } from './src/utils/db'
import dotenv from 'dotenv'
import cors from 'cors'
import seed from './src/Services/Seed'

dotenv.config()
const app = express()
const port = process.env.PORT || 80
new Server(app)

app.use(cors())
app.get('/', (req, res) => res.send('DreamsTeam Api'))
app.use('/products', express.json(), ProductsRouter)
app.use('/img', express.static('public/img/'))

connect()
  .then(() => seed(process.argv.includes('--seed')))
  .then(() =>
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  )
  .catch((e) => console.error('Seeder error', e))
