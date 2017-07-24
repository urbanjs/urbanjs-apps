import { ACTION_SET_LOCALE } from '../constants';

export function setLocale({locale}: { locale: string }) {
  return {
    type: ACTION_SET_LOCALE,
    payload: {
      locale
    }
  };
}
