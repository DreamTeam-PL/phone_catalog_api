
import { sequelize } from '../utils/db';
import Product from '../models/Products';
import * as data from '../data/phones.json';

console.log('DATA', typeof Array.from(data));

export async function seed() {
  try {
    await sequelize.sync();
    for (const record of Array.from(data)) {
      await Product.create(record);
    }
    return true;
  } catch (error) {
    throw new Error(String(error));
  } finally {
    sequelize.close();
  }
}
