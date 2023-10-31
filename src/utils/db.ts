const { Sequelize } = require('sequelize')

// export const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// })
const sequelize = new Sequelize(
  'postgres://products_s2fp_user:SYR2ioLPw3075f0s57aCaICWJU0NI2S1@dpg-cl00i43amefc73cge3v0-a.frankfurt-postgres.render.com/products_s2fp'
)

export async function connect() {
  try {
    await sequelize.authenticate()
    console.log(process.env)
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export const PORT = process.env.PORT
export const CLIENT_URL = process.env.CLIENT_URL
