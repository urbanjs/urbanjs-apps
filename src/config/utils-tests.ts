import * as expect from 'assert';
import { applyEnvironmentVariables } from './utils';

describe('CM proxy lambda', () => {
  describe('.applyEnvironmentVariables()', () => {
    describe('when no environment variable is set', () => {
      it('returns the original config', () => {
        const config = {defaultValue: 'defaultValue'};
        expect.deepEqual(applyEnvironmentVariables(config), config);
      });
    });

    describe('when an option is overridden by environment variables', () => {
      beforeEach(() => {
        process.env.ZV_APP__STRING_VALUE = 'string2';
      });

      it('the environment variable is used', () => {
        const config = {stringValue: 'string'};
        expect.deepEqual(applyEnvironmentVariables(config), {stringValue: 'string2'});
      });

      describe('and the original value is number', () => {
        beforeEach(() => {
          process.env.ZV_APP__NUMBER = '2';
          process.env.ZV_APP__NUMBER_NAN = 'asd';
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
          process.env.ZV_APP__BOOLEAN_TRUE = 'true';
          process.env.ZV_APP__BOOLEAN_TRUE_UPPERCASE = 'TRUE';
          process.env.ZV_APP__BOOLEAN_FALSE = 'false';
          process.env.ZV_APP__BOOLEAN_FALSE_UPPERCASE = 'false';
          process.env.ZV_APP__BOOLEAN_UNKNOWN = 'unknown';
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
        process.env.ZV_APP__NESTED__VALUE = 'string2';
      });

      it('supports environment variable overrides', () => {
        const config = {nested: {value: 'string'}};
        expect.deepEqual(applyEnvironmentVariables(config), {nested: {value: 'string2'}});
      });
    });
  });
});
