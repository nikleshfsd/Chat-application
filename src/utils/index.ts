import { utc } from 'moment';

export const formatMessage = (name, content) => {
  const createdAt = utc().toDate();
  return {
    name,
    content,
    createdAt,
  };
};
