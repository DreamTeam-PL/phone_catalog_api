'use strict';

import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const url = `postgres://products_s2fp_user
:SYR2ioLPw3075f0s57aCaICWJU0NI2S1@dpg-cl00i43amefc73cge3v0-a.frankfurt-postgres.render.com/products_s2fp`;

const sequelize = new Sequelize(url, {
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;