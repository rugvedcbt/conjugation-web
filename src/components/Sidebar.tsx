import React, { useState, useEffect } from 'react';
import { useLetterContext } from '../context/LetterContext';
import { useSearchContext } from '../context/SearchContext';
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from '@mui/material/List';

function Sidebar() {

  interface FavWords {
    word: any;
  }

  const [favourites, setFavourites] = useState<FavWords[]>([]);
  const { currentLetter, verb, setVerb, showFavourites, mobile, setMobile, searchWord } = useLetterContext();
  const { searchedWords } = useSearchContext();

  const toggleContent = () => {
    setMobile(!mobile);
  };

  const handleWordChange = (word: string) => {
    setVerb(word);
    toggleContent();
  };

  const isWordInFavorites = (word: string) => {
    return favourites.some((favWord) => favWord.word === word);
  };

  const handleFavourites = (word: string) => {
    if (isWordInFavorites(word)) {
      setFavourites((prevFavourites) => prevFavourites.filter((favWord) => favWord.word !== word));
    } else {
      setFavourites((prevFavourites) => [...prevFavourites, { word }]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const letterValues = alphapeticLettersData[currentLetter];

  return (
    <div className={`sidebar ${mobile ? 'mobile-sidebar-on' : ''}`}>
      {searchedWords.length !== 0 ? (
        <List>
          {searchedWords.map((value) => (
            <React.Fragment key={value}>
              {(showFavourites && isWordInFavorites(verb)) || !showFavourites ? (
                <ListItem disablePadding>
                  {searchWord === verb ? (
                    <ListItemButton selected>
                      <ListItemIcon>
                        {favourites.some((favWord) => favWord.word === verb) ? (
                          <StarIcon onClick={() => handleFavourites(value)} />
                        ) : (
                          <StarBorderIcon onClick={() => handleFavourites(value)} />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                    </ListItemButton>
                  ) : (
                    <ListItemButton>
                      <ListItemIcon>
                        {favourites.some((favWord) => favWord.word === value) ? (
                          <StarIcon onClick={() => handleFavourites(value)} />
                        ) : (
                          <StarBorderIcon onClick={() => handleFavourites(value)} />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                    </ListItemButton>
                  )}
                </ListItem>
              ) : null}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <div>
          {letterValues && !showFavourites ? (
            <List>
              {letterValues.map((value, index) => (
                <React.Fragment key={index}>
                  {(showFavourites && isWordInFavorites(value)) || !showFavourites ? (
                    <ListItem disablePadding>
                      {verb === value ? (
                        <ListItemButton selected>
                          <ListItemIcon>
                            {favourites.some((favWord) => favWord.word === value) ? (
                              <StarIcon onClick={() => handleFavourites(value)} />
                            ) : (
                              <StarBorderIcon onClick={() => handleFavourites(value)} />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                        </ListItemButton>
                      ) : (
                        <ListItemButton>
                          <ListItemIcon>
                            {favourites.some((favWord) => favWord.word === value) ? (
                              <StarIcon onClick={() => handleFavourites(value)} />
                            ) : (
                              <StarBorderIcon onClick={() => handleFavourites(value)} />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                        </ListItemButton>
                      )}
                    </ListItem>
                  ) : null}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <List>
              {favourites.length === 0 ? <ListItem> No Favourites Added</ListItem> : <div>{Object.keys(alphapeticLettersData).map((letter, index) => (
                <div key={index}>
                  <List>
                    {alphapeticLettersData[letter].map((value, valueIndex) => (
                      <React.Fragment key={valueIndex}>
                        {(showFavourites && isWordInFavorites(value)) || !showFavourites ? (
                          <ListItem disablePadding>
                            {verb === value ? (
                              <ListItemButton selected>
                                <ListItemIcon>
                                  {favourites.some((favWord) => favWord.word === value) ? (
                                    <StarIcon onClick={() => handleFavourites(value)} />
                                  ) : (
                                    <StarBorderIcon onClick={() => handleFavourites(value)} />
                                  )}
                                </ListItemIcon>
                                <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                              </ListItemButton>
                            ) : (
                              <ListItemButton>
                                <ListItemIcon>
                                  {favourites.some((favWord) => favWord.word === value) ? (
                                    <StarIcon onClick={() => handleFavourites(value)} />
                                  ) : (
                                    <StarBorderIcon onClick={() => handleFavourites(value)} />
                                  )}
                                </ListItemIcon>
                                <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                              </ListItemButton>
                            )}
                          </ListItem>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </List>
                </div>
              ))}</div>}

            </List>
          )}
        </div>
      )
      }

    </div >
  )
}


export default Sidebar;
