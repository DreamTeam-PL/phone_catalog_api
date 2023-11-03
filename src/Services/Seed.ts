import * as fs from 'fs';
import * as path from 'path';
import productData from '../data/phones.json'
import Product from '../models/Product'
import PhoneModel from '../models/Phone';
import { sequelize } from '../utils/db'
import { Phone } from '../types/types';

export const seedProduct = async () => await Product.bulkCreate(productData)
  .catch((error) => console.error('[seedProduct]: Błąd podczas ładowania danych do bazy danych: ', error));

const seedPhones = async () => {
  const directoryPath = path.join(__dirname, '/../data/phones/');
  const phonesData: Phone[] = [];

  for (const file of fs.readdirSync(directoryPath)) {
    const fileContent = fs.readFileSync(path.join(directoryPath, file), 'utf-8'); 
    phonesData.push(JSON.parse(fileContent));
  }
  await PhoneModel.bulkCreate(phonesData)
    .catch((error) => console.error('[seedPhones]: Błąd podczas ładowania danych do bazy danych: ', error));
};

export default async function(runSeeder:boolean) {
  return runSeeder ? await sequelize.sync().then(async () => {
    await seedProduct();
    await seedPhones();
  }) : true;
}


