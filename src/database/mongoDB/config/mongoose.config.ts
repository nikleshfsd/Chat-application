import * as dotenv from 'dotenv';
const PRODUCTION_ENV = 'development';
dotenv.config();

export const mongooseConfiguration = () => {
  const url = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;

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
