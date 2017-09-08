import 'reflect-metadata';
import * as expect from 'assert';
import { httpRoute, METADATA_KEY_HTTP_ROUTE, HttpRouteOptions } from './http-route';

describe('src/server/decorators/http-route', () => {
  let routeOptions: HttpRouteOptions;

  beforeEach(() => {
    routeOptions = {
      method: 'GET' as 'GET',
      path: '/'
    };
  });

  describe('when not a method is decorated with @httpRoute', () => {
    it('throws', () => {
      try {
        class TestClass {
          string: 'asd';
        }

        httpRoute(routeOptions)(TestClass, 'string', Object.getOwnPropertyDescriptor(TestClass, 'string'));

        expect.equal(TestClass, true, 'expected to throw');
      } catch (e) {
        expect.equal(e.message, '@httpRoute() decorator can be used for methods only');
      }
    });
  });

  describe('when a method is decorated with @httpRoute', () => {
    it('adds the `METADATA_KEY_HTTP_ROUTE` tag to the method', () => {
      class TestClass {
        @httpRoute(routeOptions)
        methodA() {
          return true;
        }
      }

      const currentRouteOptions = Reflect.getMetadata(
        METADATA_KEY_HTTP_ROUTE,
        TestClass.prototype,
        'methodA'
      );

      expect.deepEqual(currentRouteOptions, routeOptions);
    });
  });
});
