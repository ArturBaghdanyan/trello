import axios, { AxiosRequestConfig } from 'axios';

async function request<Type>(
  path: string,
  options?: AxiosRequestConfig
): Promise<Type> {
  const { method = 'get', data = null, headers = {} } = options || {};
  const API_URL = process.env.REACT_APP_API_URL;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const requestParams = {
    url: `${API_URL}${path}.json`,
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    data,
  };

  if (method === 'get') {
    delete requestParams.data;
  }

  try {
    const response = await axios(requestParams);

    return response.data;
  } catch (err) {
    console.error('>>> API Error ', err);
    throw err;
  }
}

export default request;
