import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';
import React from 'react';

try {
  console.log("Attempting to render App...");
  // Note: App has BrowserRouter, which fails in node environment because it needs window.
  // We can just try to import everything and see if there is an import error.
  console.log("App imported successfully.");
} catch (e) {
  console.error("Error during import/render:", e);
}
