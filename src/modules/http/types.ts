import { RequestInit, Headers } from 'node-fetch';

export const TYPE_HTTP_SERVICE = 'TYPE_HTTP_SERVICE';
export const TYPE_DRIVER_FETCH = 'TYPE_DRIVER_FETCH';

export type Fetch = <T>(url: string, init?: RequestInit) => Promise<{
  headers: Headers;
  json(): Promise<T>;
  text(): Promise<string>;
}>;

export type HttpRequestOptions = {
  uri: string;
  method: string;
  headers?: { [index: string]: string };
  body?: object;
};

export interface IHttpService {
  request<T extends (object | string)>(options: HttpRequestOptions): Promise<T>;
}
