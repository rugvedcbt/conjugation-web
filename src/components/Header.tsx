import React, { ChangeEventHandler, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import ileanLogo from '../images/ilearn-logo.png';
import ViewListIcon from '@mui/icons-material/ViewList';
import Snackbar from '@mui/material/Snackbar';
import { useLetterContext } from '../context/LetterContext';
import { useSearchContext } from '../context/SearchContext';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';
import { SnackbarContent } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const settings = ['Settings', 'Share', 'About', 'Privacy Policy', 'Remove Ads'];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { showFavourites, setShowFavourites, searchWord, setSearchWord, setCurrentLetter, setTab, snackMessage } = useLetterContext();
  const { setSearchedWords } = useSearchContext();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const toggleFavourites = () => {
    setShowFavourites(!showFavourites);
    setSearchWord('');
    setCurrentLetter('A-Z');
    setTab(0);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchWord(searchValue);
    setMessage(`searched word ${searchValue} not found`);

    const filteredWords: string[] = Object.keys(alphapeticLettersData)
      .flatMap(letter => alphapeticLettersData[letter])
      .filter(word => word.toLowerCase().includes(searchValue));

    setSearchedWords([...filteredWords]);

    setOpen(filteredWords.length === 0 && searchValue.trim() !== '');

  };


  useEffect(() => {
    if (open) {
      setOpen(false);
    }
    if (snackMessage) {
      setMessage(snackMessage);
      setOpen(true);
    }
  }, [snackMessage]);

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };
  
  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };
  
  const storedTheme = localStorage.getItem("theme");
  
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);
  
  if (defaultDark) {
    setDark();
  }
  
  const toggleTheme: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (storedTheme === "dark") {
      setDarkTheme(false)
      setLight();
    } else {
      setDarkTheme(true)
      setDark();    
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className='logo-head'>
            <img src={ileanLogo} className='ilearn-logo' alt="logo" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              iLearn Conjugation
            </Typography>
          </div>

          <div className='cm-gp-btn'>

            <Box sx={{ flexGrow: 0 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchWord}
                  onChange={handleSearch}
                />
              </Search>
            </Box>

            <Snackbar
              className='snackbar'
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <SnackbarContent
                style={{ backgroundColor: 'white', color: 'black' }}
                message={message}
              />
            </Snackbar>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Favourites">
                {showFavourites ? (
                  <IconButton size="large" aria-label="list-favorites" color="inherit" onClick={toggleFavourites}>
                    <ViewListIcon />
                  </IconButton>)
                  :
                  (<IconButton size="large" aria-label="favorites" color="inherit" onClick={toggleFavourites}>
                    <StarIcon />
                  </IconButton>
                  )}
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Dark Mode">
                <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleTheme}>
                  {darkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton color="inherit" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MoreIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
