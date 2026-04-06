import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { NotificationProvider } from './context/NotificationProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <NotificationProvider>
    <App />
  </NotificationProvider>
);

let appTree = app;

if (process.env.NODE_ENV === 'development') {
  const { DevSupport } = require('@react-buddy/ide-toolbox');
  const { ComponentPreviews, useInitial } = require('./dev');
  appTree = <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>{app}</DevSupport>;
}

root.render(
  <React.StrictMode>
    {appTree}
  </React.StrictMode>
);
