import * as expect from 'assert';
import { Container } from 'inversify';
import { ValidationError } from '../error/errors';
import { TYPE_CONFIG_LOGGER, LoggerConfig } from '../log/types';
import { logModule } from '../log';
import { uuidModule } from '../uuid';
import { jsonModule } from './index';
import { TYPE_JSON_SERVICE, IJSONService } from './types';

describe('modules/json', () => {
  describe('JSON Service', () => {
    let jsonService: IJSONService;

    beforeEach(() => {
      const container = new Container();
      container.bind<LoggerConfig>(TYPE_CONFIG_LOGGER).toConstantValue({
        error: false,
        warning: false,
        info: false,
        debug: false
      });

      container.load(jsonModule, uuidModule, logModule);
      jsonService = container.get<IJSONService>(TYPE_JSON_SERVICE);
    });

    describe('.validate', () => {
      it('returns {isValid: false, errors: Error[]} when the object does not match the schema', () => {
        const validationResult = jsonService.validate({}, {
          type: 'object',
          additionalProperties: false,
          required: ['a'],
          properties: {
            a: {
              type: 'string'
            }
          }
        });

        expect.equal(typeof validationResult, 'object');
        expect.deepEqual(Object.keys(validationResult), ['isValid', 'errors']);
        expect.equal(validationResult.isValid, false);
        expect.equal(validationResult.errors[0] instanceof ValidationError, true);
      });

      it('returns {isValid: true, errors: []} when the object matches the schema', () => {
        const validationResult = jsonService.validate({a: 'a'}, {
          required: ['a'],
          properties: {
            a: {
              type: 'string'
            }
          }
        });

        expect.equal(typeof validationResult, 'object');
        expect.deepEqual(Object.keys(validationResult), ['isValid', 'errors']);
        expect.equal(validationResult.isValid, true);
        expect.equal(validationResult.errors.length, 0);
      });

      describe('when guid is given as part of the schema', () => {
        it('it supports the guid type', () => {
          const validationResult = jsonService.validate(
            {a: '33f57b56-233d-479d-a22e-ebf094497d49'},
            {
              properties: {
                a: {
                  type: 'string',
                  guid: true
                }
              }
            });

          expect.equal(validationResult.isValid, true);
          expect.equal(validationResult.errors.length, 0);
        });

        it('it validates based on the v4 format', () => {
          const validationResult = jsonService.validate(
            {a: '00000000-0000-0000-0000-000000000000'},
            {
              properties: {
                a: {
                  type: 'string',
                  guid: true
                }
              }
            });

          expect.equal(validationResult.isValid, false);
          expect.equal(validationResult.errors[0].message, 'a should pass "guid" keyword validation');
        });
      });
    });
  });
});
