window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};

import * as React from 'react';
import * as ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement('div'), div);
});
