import express from 'express'
import { Server } from 'http'
import productsRouter from './src/Routes/products'
import { connect, seed } from './src/utils/db';
import dotenv from 'dotenv'
import cors from 'cors'
// import { seed } from './src/Services/seed'; 

dotenv.config()

const app = express()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = new Server(app);
const port = process.env.PORT || 80

app.use(cors())
app.use('/product/', express.json(), productsRouter)
app.get('/', (req, res) => res.send('DreamsTeam Api'))

connect().then(() => 
    seed().then(() => app.listen(port, () => { 
      console.log(`Server is running on port ${port}`)
    }))).catch((e) => console.error('Seeder error', e));
