import {addLocaleData} from 'react-intl';
import * as enLocaleData from 'react-intl/locale-data/en';
import * as huLocaleData from 'react-intl/locale-data/hu';
import enTranslationMessages from './en';
import huTranslationMessages from './hu';

addLocaleData(enLocaleData);
addLocaleData(huLocaleData);

export type Messages = { [key: string]: string };

export const addMissingMessagesFrom = (translation: Messages, ...fallbackTranslations: Messages[]): Messages =>
  Object.assign({}, translation, ...fallbackTranslations.map(fallbackTranslation =>
    Object.keys(fallbackTranslation).reduce(
      (missingMessages: Messages, messageId: string) => {
        if (!translation.hasOwnProperty(messageId)) {
          missingMessages[messageId] = fallbackTranslation[messageId];
        }

        return missingMessages;
      },
      {}
    )
  ));

export const translations = {
  hu: huTranslationMessages,
  en: addMissingMessagesFrom(enTranslationMessages, huTranslationMessages)
};
