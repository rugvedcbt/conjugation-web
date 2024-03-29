import React, { useState, useEffect } from 'react';

// Hooks
import { useLetterContext } from '../context/LetterContext';
import { useSearchContext } from '../context/SearchContext';

// Constants
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';

// Components
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';


function Sidebar() {

  interface FavWords {
    word: any;
  }

  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem('favourites');
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });
  const { currentLetter, verb, setVerb, showFavourites, mobile, setMobile, setSnackMessage, setLoading, setWordData } = useLetterContext();
  const { searchedWords , searchWord } = useSearchContext();

  const toggleContent = () => {
    setMobile(!mobile);
  };

  const handleWordChange = (word: string) => {
    if(verb !== word){
      setWordData([])
      setLoading(true)
    }
    setVerb(word);
    toggleContent();
  };

  const isWordInFavorites = (word: string) => {
    return favourites.some((favWord: FavWords) => favWord.word === word);
  };

  const handleFavourites = (word: string) => {

    if (isWordInFavorites(word)) {
      setFavourites((prevFavourites: FavWords[]) => prevFavourites.filter((favWord: FavWords) => favWord.word !== word));
    } else {
      setFavourites((prevFavourites: FavWords[]) => [...prevFavourites, { word }]);
    }
    setSnackMessage(`"${word}" ${isWordInFavorites(word) ? 'removed from' : 'added to'} favorites`);

  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const letterValues = alphapeticLettersData[currentLetter];

  return (
    <div className={`sidebar ${mobile ? 'mobile-sidebar-on' : ''}`}>
      {searchedWords.length !== 0 && searchWord.length !== 0 ? (
        <List>

          {searchedWords.map((value) => (
            <React.Fragment key={value}>
              {(showFavourites && isWordInFavorites(value)) || !showFavourites ? (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {isWordInFavorites(value) ? (
                        <FavoriteIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                      ) : (
                        <FavoriteBorderIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                      )}
                    </ListItemIcon>
                    <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                  </ListItemButton>
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
                            {favourites.some((favWord: FavWords) => favWord.word === value) ? (
                              <FavoriteIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                            ) : (
                              <FavoriteBorderIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                            )}
                          </ListItemIcon>
                          <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                        </ListItemButton>
                      ) : (
                        <ListItemButton>
                          <ListItemIcon>
                            {favourites.some((favWord: FavWords) => favWord.word === value) ? (
                              <FavoriteIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                            ) : (
                              <FavoriteBorderIcon onClick={() => handleFavourites(value)} className='star-icon'/>
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

              {favourites.length === 0 && showFavourites && <ListItem> No Favourites Added</ListItem>}
              <div>
                {Object.keys(alphapeticLettersData).map((letter, index) => (
                  <div key={index}>
                    {/* {letter} */}
                    <List>
                      {alphapeticLettersData[letter].map((value, valueIndex) => (
                        <React.Fragment key={valueIndex}>
                          {(showFavourites && isWordInFavorites(value)) || !showFavourites ? (
                            <ListItem disablePadding>
                              {verb === value ? (
                                <ListItemButton selected>
                                  <ListItemIcon>
                                    {favourites.some((favWord: FavWords) => favWord.word === value) ? (
                                      <FavoriteIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                                    ) : (
                                      <FavoriteBorderIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                                    )}
                                  </ListItemIcon>
                                  <ListItemText primary={value} onClick={() => handleWordChange(value)} />
                                </ListItemButton>
                              ) : (
                                <ListItemButton>
                                  <ListItemIcon>
                                    {favourites.some((favWord: FavWords) => favWord.word === value) ? (
                                      <FavoriteIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                                    ) : (
                                      <FavoriteBorderIcon onClick={() => handleFavourites(value)} className='star-icon'/>
                                    )}
                                  </ListItemIcon>
                                  <ListItemText primary={value} onClick={() => handleWordChange(value)} className='star-icon'/>
                                </ListItemButton>
                              )}
                            </ListItem>
                          ) : null}
                        </React.Fragment>
                      ))}
                    </List>
                  </div>
                ))}
              </div>

            </List>
          )}
        </div>
      )
      }
    </div >
  )
}


export default Sidebar;
