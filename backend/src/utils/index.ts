import { utc } from 'moment';

export const formatMessage = (
  id: string,
  name: string,
  content: string,
): { id: string; name: string; content: string; createdAt: Date } => {
  const createdAt = utc().toDate();
  return {
    id,
    name,
    content,
    createdAt,
  };
};

