import React, { useState, useEffect } from 'react';
import {useLetterContext} from '../context/LetterContext'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSearchContext } from '../context/SearchContext';

export default function LetterBar() {
  const { letters, setCurrentLetter, currentLetter, setVerb, setMobile, setSearchWord } = useLetterContext();
  const { setSearchedWords } = useSearchContext();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLetterChange = (letter: string) => {
    setCurrentLetter(letter)
    setVerb('')
    setSearchWord('')
    setSearchedWords([])
    setMobile(false)
  };

  useEffect(() => {
    
  },[currentLetter]);

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
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