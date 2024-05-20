import React, { useEffect } from 'react';
import {useLetterContext} from '../context/LetterContext'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSearchContext } from '../context/SearchContext';
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';


export default function LetterBar() {
  const { letters, setCurrentLetter, currentLetter, setVerb, setMobile, setShowFavourites, tab ,setTab, setLoading, setWordData, verb } = useLetterContext();
  const { setSearchedWords, setSearchWord } = useSearchContext();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleLetterChange = (letter: string) => {
    setVerb('');
    setCurrentLetter(letter);
    setSearchWord('');
    setSearchedWords([]);
    setMobile(false);
    setShowFavourites(false);
    if(letter === 'all'){
      setVerb('about')
    }else if(verb !== alphapeticLettersData[letter][0]){
      setWordData([]);
      setLoading(true);
      setVerb(alphapeticLettersData[letter][0])
    }else{
      setVerb(alphapeticLettersData[letter][0])
    }
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