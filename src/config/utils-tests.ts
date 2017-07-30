import * as expect from 'assert';
import { applyEnvironmentVariables, toConstantCase } from './utils';

describe('src/config/utils', () => {
  describe('.toConstantCase()', () => {
    it('works properly', () => {
      [
        ['', ''],
        ['a', 'A'],
        ['aB', 'A_B'],
        ['_aB_', '_A_B_'],
        ['AB', 'AB'],
        ['singleWord', 'SINGLE_WORD'],
        ['multipleUPPERCASEvalue', 'MULTIPLE_UPPERCASE_VALUE'],
        ['aBCaBCaD', 'A_BC_A_BC_A_D']
      ].forEach((item) => {
        expect.equal(toConstantCase(item[0]), item[1], `${item[0]} --> ${item[1]}`);
      });
    });
  });

  describe('.applyEnvironmentVariables()', () => {
    describe('when no environment variable is set', () => {
      it('returns the original config', () => {
        const config = {defaultValue: 'defaultValue'};
        expect.deepEqual(applyEnvironmentVariables(config), config);
      });
    });

    describe('when an option is overridden by environment variables', () => {
      beforeEach(() => {
        process.env.STRING_VALUE = 'string2';
      });

      it('the environment variable is used', () => {
        const config = {stringValue: 'string'};
        expect.deepEqual(applyEnvironmentVariables(config), {stringValue: 'string2'});
      });

      describe('and the original value is number', () => {
        beforeEach(() => {
          process.env.NUMBER = '2';
          process.env.NUMBER_NAN = 'asd';
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
          process.env.BOOLEAN_TRUE = 'true';
          process.env.BOOLEAN_TRUE_UPPERCASE = 'TRUE';
          process.env.BOOLEAN_FALSE = 'false';
          process.env.BOOLEAN_FALSE_UPPERCASE = 'false';
          process.env.BOOLEAN_UNKNOWN = 'unknown';
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
        process.env.NESTED__VALUE = 'string2';
      });

      it('supports environment variable overrides', () => {
        const config = {nested: {value: 'string'}};
        expect.deepEqual(applyEnvironmentVariables(config), {nested: {value: 'string2'}});
      });
    });

    describe('when root process environment variable prefix is set', () => {
      beforeEach(() => {
        process.env.STRING_VALUE = 'string3';
        process.env.PREFIX__STRING_VALUE = 'string2';
      });

      it('applies the environment variables prefixed with the given value', () => {
        const config = {stringValue: 'string'};
        expect.deepEqual(applyEnvironmentVariables(config, 'PREFIX'), {stringValue: 'string2'});
      });
    });
  });
});
