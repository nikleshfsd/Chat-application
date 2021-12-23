import dotenv from 'dotenv';
import { PRODUCTION_ENV } from '../../../constants';

dotenv.config();

export const mongooseConfiguration = () => {
  const url =
    process.env.NODE_ENV === PRODUCTION_ENV
      ? `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_NAME}?authSource=admin&ssl=true`
      : `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;

  const options =
    process.env.NODE_ENV === PRODUCTION_ENV
      ? {}
      : {
          dbName: process.env.MONGODB_NAME,
          user: process.env.MONGODB_USER,
          pass: process.env.MONGODB_PASS,
        };

  return {
    url,
    options,
    getConnectionUrl() {
      return this.url;
    },
  };
};
