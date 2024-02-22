import React, { useState } from 'react';
import Header from './components/Header';
import LetterBar from './components/LettersBar';
import WordsSidebar from './components/WordsSidebar';
import './App.css';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="App">
      <div className='fixed-header'>
        <Header onToggleFavorites={() => setShowFavorites(!showFavorites)} />
        <LetterBar />
      </div>
      <WordsSidebar showFavorites={showFavorites} />
    </div>
  );
}

export default App;
