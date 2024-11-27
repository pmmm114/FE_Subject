import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { server } from '@TimeTable/libs/msw/broswer';

import './global.css';
import App from './app/app';

server.start({ onUnhandledRequest: 'bypass' });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
