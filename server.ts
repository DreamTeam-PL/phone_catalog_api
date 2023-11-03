import express from 'express'
import { Server } from 'http'
import productsRouter from './src/Routes/products'
import phoneRouter from './src/Routes/Phones'
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
app.use('/products', express.json(), productsRouter)
app.use('/phones', express.json(), phoneRouter)
app.use('/images', express.static('public/images/'))

connect()
  .then(() => seed(process.argv.includes('--seed')))
  .then(() =>
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  )
  .catch((e) => console.error('Seeder error', e))
