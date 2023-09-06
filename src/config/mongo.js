import dotenv from 'dotenv';

dotenv.config();

export const mongoConnectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_CLUSTER}.isahgqf.mongodb.net/devhouse?retryWrites=true&w=majority`;
export const mongoParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
