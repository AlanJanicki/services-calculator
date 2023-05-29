import './index.css';

import React from 'react';
import { Provider } from 'react-redux';

import { ServicesCalculator } from './features';
import { setupStore } from './store/';

const App = () => (
  <Provider store={setupStore()}>
    <ServicesCalculator />
  </Provider>
);

export default App;
