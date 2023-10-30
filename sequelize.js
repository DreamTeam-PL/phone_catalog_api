const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'dpg-cl00i43amefc73cge3v0-a',
  port: 5432,
  database: 'products_s2fp',
  username: 'products_s2fp_user',
  password: 'SYR2ioLPw3075f0s57aCaICWJU0NI2S1',
})

// connection test
sequelize
  .authenticate()
  .then(() => {
    console.log('Połączenie z bazą danych PostgreSQL udane.')
  })
  .catch((error) => {
    console.error('Błąd połączenia z bazą danych:', error)
  })

module.exports = { sequelize }
