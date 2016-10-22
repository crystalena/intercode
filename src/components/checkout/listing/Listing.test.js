import React from 'react';
import ReactDOM from 'react-dom';
import Listing from './Listing';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Listing />, div);
});
