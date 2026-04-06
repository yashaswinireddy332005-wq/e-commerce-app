import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';
import { NotificationProvider } from './context/NotificationProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <NotificationProvider>
    <App />
  </NotificationProvider>
);

root.render(
  <React.StrictMode>
    {process.env.NODE_ENV === 'development' ? <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>{app}</DevSupport> : app}
  </React.StrictMode>
);
