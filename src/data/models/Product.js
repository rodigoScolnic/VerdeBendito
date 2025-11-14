import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Product = sequelize.define('Product' , {
        id: {
            type: DataTypes.INTEGER ,
            allowNull: false ,
            autoIncrement: true ,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        discont: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
    },
    {
        tableName: 'products' ,
        timestamps: false  
    }
)

Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

export default Product;