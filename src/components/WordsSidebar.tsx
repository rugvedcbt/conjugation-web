import * as React from 'react';
import { useLetterContext } from '../context/LetterContext';
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';

export default function WordsSidebar() {
  const handleWordChange = (word: string) => {
    console.log('word...', word);
    // setCurrentLetter(word)
  };
  const { currentLetter } = useLetterContext()
  const letterValues = alphapeticLettersData[currentLetter];
  console.log('letterValues..', letterValues)
  return (
  <div className='words-main-bar'>
    <div className='words-side-menu'>
        {letterValues && (
          <ul>
            {letterValues.map((value, index) => (
              <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary={value} key={index} onClick={() => handleWordChange(value)}/>
              </ListItemButton>
            </ListItem>
              // <li key={index}>&#9733; {value}</li>
            ))}
          </ul>
        )}
        {!letterValues && (
          <ul>
           {Object.keys(alphapeticLettersData).map((letter, index) => (
            <div key={index}>
              <ul>
                {alphapeticLettersData[letter].map((value, valueIndex) => (
                  <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StarBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary={value} key={valueIndex} onClick={() => handleWordChange(value)}/>
                  </ListItemButton>
                  </ListItem>
                ))}
              </ul>
            </div>
          ))}
          </ul>
        )}
     </div>
    <div className='words-content'>Content
    
    </div>
  </div>
  );
}