import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { worker } from './mocks/msw/server/browser';

//uncomment in real production with backend
// if (process.env.NODE_ENV === 'development') {
worker.start();
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
