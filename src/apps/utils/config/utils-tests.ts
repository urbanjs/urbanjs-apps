import es6TemplateResolver = require('es6-template-strings');
import * as expect from 'assert';
import { applyEnvironmentVariables, toConstantCase, resolveReferences } from './utils';

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

    describe('when environment variable store is given', () => {
      let envVariableStore: { [key: string]: string };

      beforeEach(() => {
        process.env.STRING_VALUE = 'string1';
        envVariableStore = {STRING_VALUE: 'string2'};
      });

      it('applies the environment variables from the given store', () => {
        const config = {stringValue: 'string'};
        expect.deepEqual(
          applyEnvironmentVariables(config, '', envVariableStore),
          {stringValue: 'string2'}
        );
      });
    });
  });

  describe('.resolveReferences()', () => {
    // tslint:disable no-invalid-template-strings

    it('resolves references', () => {
      const config = {
        a: '1',
        b: '${a}'
      };

      expect.deepEqual(resolveReferences(config, es6TemplateResolver), {a: '1', b: '1'});
    });

    it('resolves nested references', () => {
      const config = {
        a: {
          c: '1'
        },
        b: '${a.c}'
      };

      expect.deepEqual(resolveReferences(config, es6TemplateResolver), {a: {c: '1'}, b: '1'});
    });

    it('only string values are supported as references', () => {
      const a = {
        c: 1,
        d: [1, 2],
        e: true
      };

      const config = {
        a,
        b: '${a}',
        c: '${a.c}',
        d: '${a.d}',
        e: '${a.e}',
      };

      expect.deepEqual(resolveReferences(config, es6TemplateResolver), {
        a,
        b: '[object Object]',
        c: '1',
        d: '1,2',
        e: 'true'
      });
    });

    // tslint:enable no-invalid-template-strings
  });
});
