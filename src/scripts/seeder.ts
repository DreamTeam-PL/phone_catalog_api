import data from '../data/phones.json'
import Product from '../models/Product'
import { sequelize } from '../utils/db'

async function checkIfDataExists() {
  const existingProducts = await Product.findAll()
  return existingProducts.length > 0
}

export async function seed() {
  try {
    const dataExists = await checkIfDataExists();
    if (!dataExists) {
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
      });
      console.log('Dane zostały załadowane do bazy danych.')
    } else {
      console.log(
        'Dane już istnieją w bazie danych. Nie dodawano nowych rekordów.'
      )
    }
 
  } catch (error) {
    console.error('Błąd podczas ładowania danych do bazy danych:', error)
  }
}
