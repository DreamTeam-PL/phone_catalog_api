import * as data from '../data/phones.json'
import Product from '../models/Phone'
import { sequelize } from '../utils/db'

export async function seed() {
  try {
    await sequelize.sync()

    await Product.bulkCreate(data, {
      fields: [
        'category',
        'phoneId',
        'itemId',
        'name',
        'fullPrice',
        'price',
        'screen',
        'capacity',
        'color',
        'ram',
        'year',
        'image',
      ],
    })

    console.log('Dane zostały załadowane do bazy danych.')
  } catch (error) {
    console.error('Błąd podczas ładowania danych do bazy danych:', error)
  }
}
