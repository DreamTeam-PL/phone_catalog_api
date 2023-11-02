const fs = require('fs')
const db = require('../utils/db.js')
const Product = require('../model/Phone.js')

const dataFilePath = '../data/phones.json'

const rawData = fs.readFileSync(dataFilePath)
const data = JSON.parse(rawData)(async () => {
  try {
    await sequelize.sync()

    for (const record of data) {
      await Product.create({
        category: record.category,
        phoneId: record.phoneId,
        itemId: record.itemId,
        name: record.name,
        fullPrice: record.fullPrice,
        price: record.price,
        screen: record.screen,
        capacity: record.capacity,
        color: record.color,
        ram: record.ram,
        year: record.year,
        image: record.image,
      })
    }

    console.log('Dane zostały załadowane do bazy danych.')
  } catch (error) {
    console.error('Błąd podczas ładowania danych do bazy danych:', error)
  }
})()
