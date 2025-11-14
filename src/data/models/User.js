import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const User = sequelize.define('User' , {
        id: {
            type: DataTypes.INTEGER ,
            allowNull: false ,
            autoIncrement: true ,
            primaryKey: true
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    },
    {
        tableName: 'users' ,
        timestamps: false  
    }
)

export default User;
