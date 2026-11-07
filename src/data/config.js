import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const dialect = process.env.DB_DIALECT || "postgres";

if (!databaseUrl && (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST)) {
  throw new Error("Configurá DATABASE_URL o las variables DB_NAME, DB_USER y DB_HOST.");
}

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect,
      logging: false,
      dialectOptions: process.env.NODE_ENV === "production"
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
      retry: { max: 2 },
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS || "",
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect,
        logging: false,
        retry: { max: 2 },
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
      }
    );

export default sequelize;