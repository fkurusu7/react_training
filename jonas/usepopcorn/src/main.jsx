import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import StarsComponent from './challenges/StarsComponent';
import TextExpanderApp from './challenges/TextExpanderApp';
import './index.css';
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <StarsComponent />

    <TextExpanderApp />
  </StrictMode>
);
