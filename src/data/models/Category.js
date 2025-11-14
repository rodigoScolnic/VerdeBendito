import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Category = sequelize.define('Category' , {
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

        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'categories' ,
        timestamps: false  
    }
)

Category.associate = (models) => {
    Category.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id'
    });
}

export default Category;