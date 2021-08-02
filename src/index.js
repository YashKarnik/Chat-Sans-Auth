import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/globals.css';
import App from './components/App.jsx';
import { RoomsContextsProvider } from './contexts/roomsContext';

ReactDOM.render(
  <RoomsContextsProvider>
    <App />
  </RoomsContextsProvider>,
  document.getElementById('root')
);
