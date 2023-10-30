import express from 'express'
import { Server } from 'http'
import productsRouter from './src/Routes/products'

const app = express()
const server = new Server(app)
const port = process.env.PORT || 80

app.use('/product/', express.json(), productsRouter)
app.get('/', (req, res) => res.send('DreamsTeam Api'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
