import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize(
  String(process.env.DB_POSTGRES),
  String(process.env.USER_POSTGRES),
  String(process.env.PASSWORD_POSTGRES),
  {
    dialect: 'postgres',
    port: parseInt(String(process.env.PORT_POSTGRES)),
    host: String(process.env.HOST_POSTGRES),
  }
);
