import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { Buffer } from 'buffer';

import App from './App';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import { getLibrary } from './utils';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/slick/slick.css';
import './assets/slick/slick-theme.css';
import './assets/styles/responsive.css';
import './assets/styles/index.css';

// it just overrides the buffer from window or if buffer is not in window it adds the buffer
window.Buffer = window.Buffer || Buffer;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
