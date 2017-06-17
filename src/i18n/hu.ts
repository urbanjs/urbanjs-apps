import {nows} from './utils';

export default {
  'component.app.welcome': nows`
    Szia {name},
    {unreadCount, number} 
    {unreadCount, plural, other {olvasatlan üzeneted} }
    van 
  `
};
