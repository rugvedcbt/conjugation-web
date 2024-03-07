import React from 'react';
import Header from './components/Header';
import LettersBar from './components/LettersBar';
import WordsSidebar from './components/WordsSidebar';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {

  return (
    <div className="App">
      <div className='fixed-header'>
        <Header />
        <LettersBar />
      </div>
      <WordsSidebar />
    </div>
  );
}

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
