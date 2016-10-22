import React from 'react';
import ReactDOM from 'react-dom';
import Adbox from './Adbox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Adbox />, div);
});
