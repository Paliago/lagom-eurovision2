import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import "./index.css";
import App from "./App.tsx";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  throw new Error("VITE_CONVEX_URL environment variable not set! See README.md");
}

const convex = new ConvexReactClient(convexUrl);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to!");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
