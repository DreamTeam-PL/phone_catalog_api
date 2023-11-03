import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';

class Phone extends Model {}

Phone.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    namespaceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacityAvailable: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceRegular: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceDiscount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colorsAvailable: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    screen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resolution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    processor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    camera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zoom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cell: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Phone',
  }
);

export default Phone;