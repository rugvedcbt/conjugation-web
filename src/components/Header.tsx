import React, { useEffect, useState } from 'react';

//  Hooks 
import { useLetterContext } from '../context/LetterContext';
import { useSearchContext } from '../context/SearchContext';

// constants
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';
import { styled, alpha } from '@mui/material/styles';

//  Components 
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
import ileanLogo from '../images/ilearn-logo.png';
import ViewListIcon from '@mui/icons-material/ViewList';
import Snackbar from '@mui/material/Snackbar';
import InputBase from '@mui/material/InputBase';
import { SnackbarContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DarkModeSwitch } from 'react-toggle-dark-mode';



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

  interface SnackbarMessage {
    message: string;
    key: number;
  }

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { showFavourites, setShowFavourites, searchWord, setSearchWord, setCurrentLetter, setTab, snackMessage } = useLetterContext();
  const { setSearchedWords } = useSearchContext();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(
    undefined,
  );

  const handleExited = () => {
    setMessageInfo(undefined);
  };

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

    const filteredWords: string[] = Object.keys(alphapeticLettersData)
      .flatMap(letter => alphapeticLettersData[letter])
      .filter(word => word.toLowerCase().includes(searchValue));

    setSearchedWords([...filteredWords]);

    setToast(`searched word ${searchValue} not found`);

    setSearchOpen(filteredWords.length === 0 && searchValue.trim() !== '');

  };


  useEffect(() => {
    if (snackMessage.length !== 0) {
      setSnackPack((prev) => [...prev, { message: snackMessage, key: new Date().getTime() }]);
    }
  }, [snackMessage]);


  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);


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
  const toggletheme = (checked: boolean) => {
      if (checked) {
        setDarkTheme(!checked)
        setLight();
      } else {
        setDarkTheme(!checked)
        setDark();
      }
    };

  useEffect( () => {
    if(storedTheme === "dark"){
      setDarkTheme(true)
    }
  }, [darkTheme, storedTheme])
  // const toggleTheme: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  //   if (storedTheme === "dark") {
  //     setDarkTheme(false)
  //     setLight();
  //   } else {
  //     setDarkTheme(true)
  //     setDark();
  //   }
  // };

  return (
    <AppBar position="static" className='main-header-wrapper'>
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
              key={messageInfo ? messageInfo.key : undefined}
              className='snackbar'
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              TransitionProps={{ onExited: handleExited }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <SnackbarContent
                style={{ backgroundColor: 'white', color: 'black' }}
                message={messageInfo ? messageInfo.message : undefined}
              />
            </Snackbar>

            <Snackbar
              className='snackbar'
              open={searchOpen}
              autoHideDuration={1200}
              onClose={() => setSearchOpen(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <SnackbarContent
                style={{ backgroundColor: 'white', color: 'black' }}
                message={toast}
              />
            </Snackbar>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Favourites">
                {showFavourites ? (
                  <IconButton sx={{ ml: 1 }} size="large" aria-label="list-favorites" color="inherit" onClick={toggleFavourites}>
                    <ViewListIcon />
                  </IconButton>)
                  :
                  (<IconButton sx={{ ml: 1 }} size="large" aria-label="favorites" color="inherit" onClick={toggleFavourites}>
                    <FavoriteIcon />
                  </IconButton>
                  )}
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Dark Mode">
                {/* <IconButton color="inherit" onClick={toggleTheme}>
                  {!darkTheme ? <DarkModeIcon /> : <LightModeOutlinedIcon />}
                </IconButton> */}
                <DarkModeSwitch
                  style={{ color: 'white' }}
                  checked={!darkTheme}
                  onChange={toggletheme}
                  size={25}
                />
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
