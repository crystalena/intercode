import React from 'react';
import ReactDOM from 'react-dom';
import Checkout from './Checkout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Checkout />, div);
});
