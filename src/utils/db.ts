import { Dialect, Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

const dbPortString = process.env.DB_PORT || '5432'
const port = parseInt(dbPortString)

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: port,
  dialect: process.env.DB_DIALECT as Dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

export async function connect() {
  try {
    await sequelize.authenticate()
    console.log(process.env)
    console.log('Connection has been established successfully.')
    return sequelize
  } catch (error) {
    throw new Error('Unable to connect to the database:')
  }
}
