import React from 'react';
import Header from './components/Header';
import LetterBar from './components/LettersBar';
import WordsSidebar from './components/WordsSidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <LetterBar />
      <WordsSidebar />
    </div>
  );
}

export default App;
