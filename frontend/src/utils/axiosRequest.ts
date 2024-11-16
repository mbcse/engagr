// utils/axiosRequest.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Reusable Axios function for making HTTP requests
 * @param method - HTTP method (GET, POST, etc.)
 * @param url - API endpoint
 * @param data - Payload for POST/PUT requests
 * @param headers - Optional headers
 * @returns Promise<T> - The API response
 */
async function Axios<T>(
  method: HttpMethod,
  url: string,
  data: Record<string, any> = {},
  headers: Record<string, string> = {}
): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error('Axios Request Error:', error.message);
    throw error;
  }
}

export default Axios;
