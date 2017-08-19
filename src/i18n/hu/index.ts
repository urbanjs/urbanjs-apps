import accountInformation from './account-information';
import userInformation from './user-information';
import common from './common';

export default Object.assign(
  common,
  userInformation,
  accountInformation,
  {
    'component.footer.copyright': 'Minden jog fenntartva',
    'component.navbar.link.login': 'Bejelentkezés',
    'component.navbar.link.account': 'Adatlap',
    'component.userCard.age': '{value} éves',
    'component.userCard.name': '{lastName} {firstName}'
  }
);
