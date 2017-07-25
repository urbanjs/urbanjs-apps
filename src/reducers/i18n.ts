import { translations } from '../i18n';
import { config } from '../config';
import { ACTION_SET_LOCALE } from '../constants';

export type SetLocaleAction = {
  type: string;
  payload: {
    locale: string;
  };
};

export type I18NState = {
  locale: string;
  availableLocales: string[];
};

export function i18n(state: I18NState = {
                       availableLocales: Object.keys(translations),
                       locale: config.defaultLocale
                     },
                     action: SetLocaleAction) {
  switch (action.type) {
    case ACTION_SET_LOCALE:
      return {
        ...state,
        locale: action.payload.locale
      };
    default:
      return state;
  }
}
