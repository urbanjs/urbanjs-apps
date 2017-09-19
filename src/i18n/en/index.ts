import accountInformation from './account-information';
import common from './common';

export default Object.assign(
  accountInformation,
  common,
  {
    'component.footer.copyright': 'Copyright',
    'component.navbar.link.account': 'Account settings'
  }
);
