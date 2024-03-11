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
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';


// Styles
import 'bootstrap/dist/css/bootstrap.min.css';


interface State extends SnackbarOrigin {
  open: boolean;
}


function Sidebar() {

  interface FavWords {
    word: any;
  }

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;


  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem('favourites');
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });
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
    return favourites.some((favWord: FavWords) => favWord.word === word);
  };

  const handleFavourites = (word: string) => {
    setState({ ...state, open: true });
      setTimeout(() => {
        handleClose();
      },2500);
    if (isWordInFavorites(word)) {
      setFavourites((prevFavourites: FavWords[]) => prevFavourites.filter((favWord: FavWords) => favWord.word !== word));
    } else {
      setFavourites((prevFavourites: FavWords[]) => [...prevFavourites, { word }]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // const storedFavourites = localStorage.getItem('favourites');

  const letterValues = alphapeticLettersData[currentLetter];

  return (
    <div className={`sidebar ${mobile ? 'mobile-sidebar-on' : ''}`}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={900}
        onClose={handleClose}
        message="favourites added"
        key={vertical + horizontal}
      />
      {searchedWords.length !== 0 && searchWord.length !== 0 ? (
        <List>
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
              <div></div>
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