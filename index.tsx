
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Could not find root element.");
} else {
  // Global error handler to help diagnose issues on mobile/embedded browsers
  window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global Error Caught:", message, error);
    if (rootElement.innerHTML === "") {
        rootElement.innerHTML = `
          <div style="padding: 20px; text-align: center; font-family: sans-serif; color: #721c24; background: #f8d7da; border-radius: 8px; margin: 20px;">
            <h3>দুঃখিত, একটি কারিগরি সমস্যা হয়েছে!</h3>
            <p>${message}</p>
            <button onclick="window.location.reload()" style="padding: 10px 20px; background: #15803d; color: white; border: none; border-radius: 5px; cursor: pointer;">আবার চেষ্টা করুন</button>
          </div>
        `;
    }
    return false;
  };

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
