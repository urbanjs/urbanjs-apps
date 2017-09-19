import { addLocaleData } from 'react-intl';
import * as enLocaleData from 'react-intl/locale-data/en';
import * as huLocaleData from 'react-intl/locale-data/hu';
import { addMissingMessagesFrom } from './utils';
import enTranslationMessages from './en';
import huTranslationMessages from './hu';

addLocaleData(enLocaleData);
addLocaleData(huLocaleData);

export const translations = {
  en: enTranslationMessages,
  hu: addMissingMessagesFrom(huTranslationMessages, enTranslationMessages)
};
