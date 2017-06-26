import {nows} from './utils';

export default {
  'component.app.welcome': nows`
    Hello {name},
    you have {unreadCount, number} 
    {unreadCount, plural, one {message} other {messages} }
  `
};
