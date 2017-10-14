import { RequestInit, Headers } from 'node-fetch';

export const TYPE_HTTP_SERVICE = 'TYPE_HTTP_SERVICE';
export const TYPE_DRIVER_FETCH = 'TYPE_DRIVER_FETCH';

export type Fetch = <T>(url: string, init?: RequestInit) => Promise<{
  headers: Headers;
  status: number;
  json(): Promise<T>;
  text(): Promise<string>;
}>;

export type HttpHeaders = { [key: string]: string };

export type HttpRequestOptions = {
  uri: string;
  method: string;
  headers?: HttpHeaders;
  body?: object | string;
};

export type HttpFullResponse<T> = {
  body: T;
  statusCode: number;
  headers?: HttpHeaders;
};

export interface IHttpService {
  request<T extends (object | string)>(options: HttpRequestOptions): Promise<T>;
  requestWithFullResponse<T extends (object | string)>(options: HttpRequestOptions): Promise<HttpFullResponse<T>>;
}
