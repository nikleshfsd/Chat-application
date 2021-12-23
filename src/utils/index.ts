import { utc } from 'moment';

export const formatMessage = (
  name: string,
  content: string,
): { name: string; content: string; createdAt: Date } => {
  const createdAt = utc().toDate();
  return {
    name,
    content,
    createdAt,
  };
};
