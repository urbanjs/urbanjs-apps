import { ContainerModule } from 'inversify';
import * as cookie from 'cookie';
import { HttpService } from './http-service';
import * as setCookie from 'set-cookie-parser';
import {
  TYPE_HTTP_SERVICE,
  IHttpService,
  ICookieService,
  TYPE_COOKIE_SERVICE, Cookie, CookieOptions
} from './types';

export const httpModule = new ContainerModule((bind) => {
  bind<IHttpService>(TYPE_HTTP_SERVICE).to(HttpService);

  bind<ICookieService>(TYPE_COOKIE_SERVICE).toConstantValue({
    serialize: (value: Cookie & CookieOptions) => cookie.serialize(value.name, value.value, {
      path: value.path,
      domain: value.domain,
      expires: value.expires,
      httpOnly: value.httpOnly,
      maxAge: value.maxAge,
      sameSite: value.sameSite,
      secure: value.secure
    }),

    parseCookieHeader: (value: string) => {
      const cookies = cookie.parse(value);

      return Object.keys(cookies).reduce(
        (acc, key) => [...acc, {name: key, value: cookies[key]}],
        [] as Cookie[]
      );
    },

    parseSetCookieHeader: (value: string) => setCookie.parse(value)
  });
});
