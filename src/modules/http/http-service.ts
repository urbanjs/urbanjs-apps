import { injectable, inject, track } from '../../decorators';
import {
  IHttpService,
  HttpRequestOptions,
  TYPE_DRIVER_FETCH,
  Fetch,
  FetchResponse,
  HttpFullResponse,
  HttpHeaders
} from './types';
import { BaseError, NO_STACK_TRACE } from '../error/errors';
import { TYPE_ERROR_SERVICE, IErrorService } from '../error/types';

@injectable()
export class HttpService implements IHttpService {

  constructor(@inject(TYPE_DRIVER_FETCH) private fetch: Fetch,
              @inject(TYPE_ERROR_SERVICE) private errorService: IErrorService) {
  }

  @track()
  public async request<T extends (object | string)>(options: HttpRequestOptions) {
    const response = await this.requestWithFullResponse<T>(options);
    return response.body;
  }

  @track()
  public async requestWithFullResponse<T extends (object | string)>(options: HttpRequestOptions) {
    let body = options.body;

    const requestHeaders = options.headers || {};
    if (body && typeof body === 'object') {
      requestHeaders['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }

    const response = await this.fetch<T>(options.uri, {
      method: options.method,
      headers: requestHeaders,
      body
    });

    await this.assertStatus<T>(response);

    const responseHeaders: HttpHeaders = {};
    let isJson = false;
    response.headers.forEach((value: string, name: string) => {
      responseHeaders[name] = value;

      if (/content-type/i.test(name)) {
        isJson = isJson || /\/json/.test(value);
      }
    });

    return {
      statusCode: response.status,
      body: isJson
        ? await response.json()
        : await response.text(),
      headers: responseHeaders
    } as HttpFullResponse<T>;
  }

  private async assertStatus<T>(response: FetchResponse<T>) {
    if (response.status < 200 || response.status > 300) {
      const error = this.errorService.createHttpErrorFromStatusCode(response.status);

      error.innerError = new BaseError(await response.text());
      error.innerError.stack = NO_STACK_TRACE;

      throw error;
    }
  }
}
