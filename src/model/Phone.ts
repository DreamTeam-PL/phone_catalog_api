const { DataTypes } = require('sequelize')
const db = require('./src/utils/db')
const sequelize = db.sequelize

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
  },
  phoneId: {
    type: DataTypes.STRING,
  },
  itemId: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  fullPrice: {
    type: DataTypes.FLOAT,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  screen: {
    type: DataTypes.STRING,
  },
  capacity: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  ram: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
  },
})

export default {
  Product,
}
