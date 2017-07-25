import * as expect from 'assert';
import { applyEnvironmentVariables } from './utils';

describe('CM proxy lambda', () => {
  describe('.applyEnvironmentVariables()', () => {
    describe('when no environment variable is set', () => {
      it('returns the original config', () => {
        const config = {value: 'string'};
        expect.deepEqual(applyEnvironmentVariables(config), config);
      });
    });

    describe('when an option is overridden by environment variables', () => {
      beforeEach(() => {
        process.env.XI_CM_PROXY_LAMBDA__VALUE = 'string2';
      });

      it('the environment variable is used', () => {
        const config = {value: 'string'};
        expect.deepEqual(applyEnvironmentVariables(config), {value: 'string2'});
      });

      describe('and the original value is number', () => {
        beforeEach(() => {
          process.env.XI_CM_PROXY_LAMBDA__NUMBER = '2';
          process.env.XI_CM_PROXY_LAMBDA__NUMBER_NAN = 'asd';
        });

        it('the converted environment variable is used', () => {
          const config = {
            number: 1,
            numberNan: 2
          };

          const configured = applyEnvironmentVariables<{ number: number, numberNan: number }>(config);
          expect.equal(configured.number, 2);
          expect.equal(isNaN(configured.numberNan), true);
        });
      });

      describe('and the original value is boolean', () => {
        beforeEach(() => {
          process.env.XI_CM_PROXY_LAMBDA__BOOLEAN_TRUE = 'true';
          process.env.XI_CM_PROXY_LAMBDA__BOOLEAN_TRUE_UPPERCASE = 'TRUE';
          process.env.XI_CM_PROXY_LAMBDA__BOOLEAN_FALSE = 'false';
          process.env.XI_CM_PROXY_LAMBDA__BOOLEAN_FALSE_UPPERCASE = 'false';
          process.env.XI_CM_PROXY_LAMBDA__BOOLEAN_UNKNOWN = 'unknown';
        });

        it('the converted environment variable is used', () => {
          const config = {
            booleanTrue: false,
            booleanTrueUppercase: false,
            booleanFalse: true,
            booleanFalseUppercase: true,
            booleanUnknown: true
          };

          expect.deepEqual(applyEnvironmentVariables(config), {
            booleanTrue: true,
            booleanTrueUppercase: true,
            booleanFalse: false,
            booleanFalseUppercase: false,
            booleanUnknown: false
          });
        });
      });
    });

    describe('when nested data is given', () => {
      beforeEach(() => {
        process.env.XI_CM_PROXY_LAMBDA__NESTED__VALUE = 'string2';
      });

      it('supports environment variable overrides', () => {
        const config = {nested: {value: 'string'}};
        expect.deepEqual(applyEnvironmentVariables(config), {nested: {value: 'string2'}});
      });
    });
  });
});
