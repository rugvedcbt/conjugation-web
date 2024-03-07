import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {LetterContextProvider} from './context/LetterContext'
import {AudioContextProvider} from './context/AudioContext'
import {SearchContextProvider} from './context/SearchContext'



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LetterContextProvider>
    <AudioContextProvider>
      <SearchContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SearchContextProvider>
    </AudioContextProvider>
  </LetterContextProvider>
);


reportWebVitals();
