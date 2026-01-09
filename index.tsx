import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function init() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical Error: Root element '#root' not found in DOM.");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Failed to mount React application:", err);
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
