import React, { useEffect } from 'react';
import {useLetterContext} from '../context/LetterContext'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSearchContext } from '../context/SearchContext';
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';


export default function LetterBar() {
  const { letters, setCurrentLetter, currentLetter, setVerb, setMobile, setSearchWord, setShowFavourites, tab ,setTab, setLoading, setWordData } = useLetterContext();
  const { setSearchedWords } = useSearchContext();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleLetterChange = (letter: string) => {
    setVerb('');
    setWordData([]);
    setCurrentLetter(letter);
    setLoading(true);
    setSearchWord('');
    setSearchedWords([]);
    setMobile(false);
    setShowFavourites(false);
    setVerb(alphapeticLettersData[letter][0]);
  };

  useEffect(() => {
    
  },[currentLetter, tab]);

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {letters.map((letter) => (
            <Tab key={letter} label={letter} onClick={() => handleLetterChange(letter)}/>
        ))}
      </Tabs>
    </Box>
  );
}