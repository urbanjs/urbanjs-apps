import * as expect from 'assert';
import { addMissingMessagesFrom, nows, Messages } from './utils';

describe('src/i18n/utils', () => {
  describe('.nows()', () => {
    it('works properly', () => {
      expect.equal(nows` `, '');
      expect.equal(nows`a  b`, 'a b');
      expect.equal(nows` a  b `, 'a b');

      const multiline = nows`
        a
        b `;
      expect.equal(multiline, 'a b');
    });
  });

  describe('.addMissingMessagesFrom()', () => {
    let translation: Messages;
    let fallbackTranslation: Messages;
    let fallbackTranslation2: Messages;

    beforeEach(() => {
      translation = {
        keyA: 'translationA',
        keyB: 'translationB'
      };

      fallbackTranslation = {
        keyA: 'fallbackTranslationA',
        keyB: 'fallbackTranslationB'
      };

      fallbackTranslation2 = {
        keyA: 'fallbackTranslation2A',
        keyB: 'fallbackTranslation2B'
      };
    });

    describe('when a key is missing from the translation', () => {
      beforeEach(() => {
        delete translation.keyA;
      });

      it('fills missing translation from the given fallback translation', () => {
        expect.deepEqual(addMissingMessagesFrom(translation, fallbackTranslation), {
          keyA: 'fallbackTranslationA',
          keyB: 'translationB'
        });
      });

      it('supports multiple fallback translations', () => {
        delete fallbackTranslation.keyA;

        expect.deepEqual(addMissingMessagesFrom(translation, fallbackTranslation, fallbackTranslation2), {
          keyA: 'fallbackTranslation2A',
          keyB: 'translationB'
        });
      });
    });
  });
});
