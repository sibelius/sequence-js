import { jsonOrText } from './jsonOrText';
import { apiWithLog } from './apiWithLog';

export const sequenceApi = (authorization: string) => async (init, options) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${authorization}`,
    ...options.headers,
  };

  const newOptions = {
    ...options,
    headers,
  };

  const response = await apiWithLog(init, newOptions);
  return await jsonOrText(response);
};
