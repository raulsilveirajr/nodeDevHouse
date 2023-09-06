import { fileURLToPath } from 'url';
import path from 'path';
import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';
import { mongoConnectionString, mongoParams } from './config/mongo.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class App {
  constructor() {
    this.server = express();

    this.mongoStart();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    this.server.use(json());
  }

  routes() {
    this.server.use(routes);
  }

  mongoStart() {
    mongoose.connect(mongoConnectionString, mongoParams);
  }
}

export default new App().server;
