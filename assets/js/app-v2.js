import { h, render } from 'preact';
import { Provider, connect } from 'react-redux';
import App from './app/app';
import {store} from './app/reducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, far);

render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector('#app-container'));
