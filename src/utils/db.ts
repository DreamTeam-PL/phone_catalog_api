import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: 'products_s2fp',
  username: 'products_s2fp_user',
  host: 'dpg-cl00i43amefc73cge3v0-a.frankfurt-postgres.render.com',
  password: 'SYR2ioLPw3075f0s57aCaICWJU0NI2S1',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await sequelize.query(
      `SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = '${tableName}'
      );`);
      console.log('Resulty:', result)
    return true;
  } catch (error) {
    console.error(`Błąd sprawdzania istnienia tabeli: ${error}`);
    return false;
  }
}



export async function connect() {
  try {
    await sequelize.authenticate()
    console.log(process.env)
    console.log('Connection has been established successfully.')
    return sequelize;
  } catch (error) {
    throw new Error('Unable to connect to the database:')
  }
}

// import Product from '../models/Products';
import * as data from '../data/phones.json';

export async function seed() {
  try {
    // await sequelize.sync();
    Array.from(data).forEach(async record => { 
       console.log('To rekortd:', record);
    });
  }catch (e) {
    throw new Error(String(e));
  }
}

export const db = {

};
