import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {LetterContextProvider} from './context/LetterContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LetterContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LetterContextProvider>
);


reportWebVitals();
