import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { NotificationProvider } from './context/NotificationProvider';

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Root render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'Poppins, sans-serif' }}>
          <h2>App failed to render</h2>
          <p>Please refresh the page. If this continues, clear site data for this URL and try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <RootErrorBoundary>{appTree}</RootErrorBoundary>
  </React.StrictMode>
);
