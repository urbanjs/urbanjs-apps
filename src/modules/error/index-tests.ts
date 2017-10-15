import * as expect from 'assert';
import { Container } from 'inversify';
import { TYPE_CONFIG_LOGGER, LoggerConfig } from '../log/types';
import { logModule } from '../log';
import { errorModule } from './index';
import { TYPE_ERROR_SERVICE, IErrorService } from './types';
import {
  BaseError,
  ForbiddenError,
  HttpError,
  ImplementationError,
  NotFoundError,
  ValidationError,
  NO_STACK_TRACE
} from './errors';

describe('modules/error', () => {
  describe('Error Service', () => {
    let errorService: IErrorService;

    beforeEach(() => {
      const container = new Container();
      container.bind<LoggerConfig>(TYPE_CONFIG_LOGGER).toConstantValue({
        error: false,
        warning: false,
        info: false,
        debug: false
      });

      container.load(logModule, errorModule);
      errorService = container.get<IErrorService>(TYPE_ERROR_SERVICE);
    });

    describe('.createHttpError', () => {
      let rawError: BaseError | Error;

      describe('if HttpError is given', () => {
        beforeEach(() => {
          rawError = new HttpError('OK', 200);
        });

        it('returns it as is', () => {
          expect.strictEqual(errorService.createHttpError(rawError), rawError);
        });
      });

      describe('if not an Error instance is given', () => {
        beforeEach(() => {
          rawError = {} as BaseError;
        });

        it('returns HttpError with status code 500', () => {
          const httpError = errorService.createHttpError(rawError);
          expect.equal(httpError.message, 'Internal Server Error');
          expect.equal(httpError.statusCode, 500);
          expect.equal(httpError.innerError.message, JSON.stringify(rawError));
          expect.equal(httpError.innerError.stack, NO_STACK_TRACE);

        });
      });

      describe('if an Error instance is given which does not derive from BaseError', () => {
        beforeEach(() => {
          rawError = new Error('raw error');
        });

        it('returns HttpError with status code 500', () => {
          const httpError = errorService.createHttpError(rawError);
          expect.equal(httpError.message, 'Internal Server Error');
          expect.equal(httpError.statusCode, 500);
          expect.equal(httpError.innerError.message, rawError.message);
          expect.equal(httpError.innerError.stack, rawError.stack);
        });
      });

      describe('if ValidationError is given', () => {
        beforeEach(() => {
          rawError = new ValidationError('bad request');
        });

        it('returns HttpError with status code 400', () => {
          const httpError = errorService.createHttpError(rawError);
          expect.equal(httpError.message, rawError.message);
          expect.equal(httpError.statusCode, 400);
          expect.equal(httpError.innerError, rawError);
        });
      });

      describe('if ForbiddenError is given', () => {
        beforeEach(() => {
          rawError = new ForbiddenError('forbidden');
        });

        it('returns HttpError with status code 401', () => {
          const httpError = errorService.createHttpError(rawError);
          expect.equal(httpError.message, rawError.message);
          expect.equal(httpError.statusCode, 401);
          expect.equal(httpError.innerError, rawError);
        });
      });

      describe('if NotFoundError is given', () => {
        beforeEach(() => {
          rawError = new NotFoundError('not found');
        });

        it('returns HttpError with status code 404', () => {
          const httpError = errorService.createHttpError(rawError);
          expect.equal(httpError.message, rawError.message);
          expect.equal(httpError.statusCode, 404);
          expect.equal(httpError.innerError, rawError);
        });
      });

      describe('if ImplementationError is given', () => {
        beforeEach(() => {
          rawError = new ImplementationError('uh-oh');
        });

        it('returns HttpError with status code 500', () => {
          const httpError = errorService.createHttpError(rawError);
          expect.equal(httpError.message, 'Internal Server Error');
          expect.equal(httpError.statusCode, 500);
          expect.equal(httpError.innerError, rawError);
        });
      });
    });

    describe('.createHttpErrorFromStatusCode', () => {
      [
        [200, 'OK'],
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [412, 'Precondition Failed'],
        [500, 'Internal Server Error']
      ].forEach((testCase: [number, string]) => {
        it(`${testCase[0]} ${testCase[1]}`, () => {
          const httpError = errorService.createHttpErrorFromStatusCode(testCase[0]);
          expect.equal(httpError.message, testCase[1]);
        });
      });
    });
  });
});
