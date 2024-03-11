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
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import List from '@mui/material/List';
import Snackbar from '@mui/material/Snackbar';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarContent } from '@mui/material';


function Sidebar() {

  interface FavWords {
    word: any;
  }

  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem('favourites');
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });
  const { currentLetter, verb, setVerb, showFavourites, mobile, setMobile, searchWord } = useLetterContext();
  const { searchedWords } = useSearchContext();
  const [open, setOpen] = useState(false);
  const [favMessage, setFavMessage] = useState('');


  const toggleContent = () => {
    setMobile(!mobile);
  };

  const handleWordChange = (word: string) => {
    setVerb(word);
    toggleContent();
  };

  const isWordInFavorites = (word: string) => {
    return favourites.some((favWord: FavWords) => favWord.word === word);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const AddWord = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  const removeWord = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };


  const handleFavourites = (word: string) => {

    if (isWordInFavorites(word)) {
      setFavourites((prevFavourites: FavWords[]) => prevFavourites.filter((favWord: FavWords) => favWord.word !== word));
      setFavMessage(`${word} removed from favourites`)
      removeWord();
    } else {
      setFavourites((prevFavourites: FavWords[]) => [...prevFavourites, { word }]);
      // added to favourites
      setFavMessage(`${word} added from favourites`)
      AddWord();
    }
  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const letterValues = alphapeticLettersData[currentLetter];

  return (
    <div className={`sidebar ${mobile ? 'mobile-sidebar-on' : ''}`}>
      {searchedWords.length !== 0 && searchWord.length !== 0 ? (
        <List>
          <div>
            <Snackbar
              className='snackbar'
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <SnackbarContent
                style={{ backgroundColor: 'lightblue', color: 'black' }}
                message={favMessage}
              />
            </Snackbar>
          </div>
          {searchedWords.map((value) => (
            <React.Fragment key={value}>
              {(showFavourites && isWordInFavorites(value)) || !showFavourites ? (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {isWordInFavorites(value) ? (
                        <StarIcon onClick={() => handleFavourites(value)} />
                      ) : (
                        <StarBorderIcon onClick={() => handleFavourites(value)} />
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
              <div>
                <Snackbar
                  className='snackbar'
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <SnackbarContent
                    style={{ backgroundColor: 'white', color: 'black' }}
                    message={favMessage}
                  />
                </Snackbar>
              </div>
              {letterValues.map((value, index) => (
                <React.Fragment key={index}>
                  {(showFavourites && isWordInFavorites(value)) || !showFavourites ? (
                    <ListItem disablePadding>
                      {verb === value ? (
                        <ListItemButton selected>
                          <ListItemIcon>
                            {favourites.some((favWord: FavWords) => favWord.word === value) ? (
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
                            {favourites.some((favWord: FavWords) => favWord.word === value) ? (
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
              <div>
                <Snackbar
                  className='snackbar'
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <SnackbarContent
                    style={{ backgroundColor: 'white', color: 'black' }}
                    message={favMessage}
                  />
                </Snackbar>
              </div>
              {favourites.length === 0 && showFavourites && <ListItem> No Favourites Added</ListItem>}
              <div>
                {Object.keys(alphapeticLettersData).map((letter, index) => (
                  <div key={index}>
                    <List>
                      {alphapeticLettersData[letter].map((value, valueIndex) => (
                        <React.Fragment key={valueIndex}>
                          {(showFavourites && isWordInFavorites(value)) || !showFavourites ? (
                            <ListItem disablePadding>
                              {verb === value ? (
                                <ListItemButton selected>
                                  <ListItemIcon>
                                    {favourites.some((favWord: FavWords) => favWord.word === value) ? (
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
                                    {favourites.some((favWord: FavWords) => favWord.word === value) ? (
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
