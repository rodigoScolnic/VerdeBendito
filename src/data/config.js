import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const DB_DIALECT = process.env.DB_DIALECT || "mysql";
if (!DB_NAME || !DB_USER || !DB_HOST) {
  throw new Error("Faltan variables de base de datos: DB_NAME, DB_USER y DB_HOST.");
}
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST, dialect: DB_DIALECT, logging: false,
  retry: { max: 2 }, pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
});
export default sequelize;