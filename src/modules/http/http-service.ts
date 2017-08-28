import { injectable, inject, track } from '../../decorators';
import { IHttpService, HttpRequestOptions, TYPE_DRIVER_FETCH, Fetch } from './types';

@injectable()
export class HttpService implements IHttpService {

  constructor(@inject(TYPE_DRIVER_FETCH) private fetch: Fetch) {
  }

  @track()
  public async request<T extends (object | string)>(options: HttpRequestOptions) {
    const response = await this.fetch<T>(options.uri, {
      method: options.method,
      headers: options.headers,
      body: options.body && JSON.stringify(options.body)
    });

    let isJson = false;
    response.headers.forEach((value: string, name: string) => {
      if (/content-type/.test(name)) {
        isJson = isJson || /application\/json/.test(value);
      }
    });

    return <T> (isJson
      ? await response.json()
      : await response.text());
  }
}
