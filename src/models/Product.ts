import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db'

class Product extends Model {
  public category!: string
  public phoneId!: string
  public itemId!: string
  public name!: string
  public fullPrice!: number
  public price!: number
  public screen!: string | null
  public capacity!: string | null
  public color!: string | null
  public ram!: string | null
  public year!: number | null
  public image!: string | null
}

Product.init(
  {
    category: DataTypes.STRING,
    phoneId: DataTypes.STRING,
    itemId: DataTypes.STRING,
    name: DataTypes.STRING,
    fullPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    screen: DataTypes.STRING,
    capacity: DataTypes.STRING,
    color: DataTypes.STRING,
    ram: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Product',
  }
)

export default Product
