import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const letterKeys = ['all','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

interface WordData {
  word: string;
}

interface WordItem {
  word: string;
  baseVerb: any;
  infinitive: any;
  indicative: any;
  modelforms: any;
  indicativeOtherForms: any;
}

interface FavWords {
  word: any;
}

interface LetterContextType {
  letters: string[];
  currentLetter: string;
  setCurrentLetter: (currentLetter: string) => void;
  verb: string;
  setVerb: (verb: string) => void;
  tab: number;
  setTab: (tab: number) => void;
  searchWord: string;
  setSearchWord: (verb: string) => void;
  snackMessage: string;
  setSnackMessage: (snackMessage: string) => void;
  favourites: any;
  setFavourites: (favourites: any) => void;
  showFavourites: boolean;
  setShowFavourites: (showFavourites: boolean) => void;
  mobile: boolean;
  setMobile: (mobile: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  wordData: WordItem[];
}

const LetterContext = createContext<LetterContextType>({
  letters: [],
  currentLetter: '',
  setCurrentLetter: () => {},
  verb: '',
  setVerb: () => {},
  tab: 0,
  setTab: () => {},
  searchWord: '',
  setSearchWord: () => {},
  snackMessage: '',
  setSnackMessage: () => {},
  favourites: '',
  setFavourites: () => {},
  showFavourites: false,
  setShowFavourites: () => {},
  mobile: false,
  setMobile: () => {},
  loading: false,
  setLoading: () => {},
  wordData: [],
});

export const useLetterContext = () => useContext(LetterContext);

export const LetterContextProvider = ({ children }: { children: ReactNode }) => {
  const [letters] = useState<string[]>(letterKeys);
  const [currentLetter, setCurrentLetter] = useState<string>('all');
  const [verb, setVerb] = useState<string>('about');
  const [tab, setTab] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>('');
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [favourites, setFavourites] = useState<FavWords[]>([]);
  const [showFavourites, setShowFavourites] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [wordData, setWordData] = useState<WordItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('json/words.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const jsonData = await response.json();
        const wordResponseData = jsonData.data;
        const filteredData = wordResponseData.filter((item: WordData) => {
          return item.word === verb;
        });
        setWordData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, [verb]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const value: LetterContextType = {
    letters,
    currentLetter,
    setCurrentLetter,
    verb,
    setVerb,
    searchWord,
    setSearchWord,
    favourites,
    setFavourites,
    showFavourites,
    setShowFavourites,
    mobile,
    setMobile,
    loading,
    setLoading,
    wordData,
    tab,
    setTab,
    snackMessage,
    setSnackMessage
  };

  return (
    <LetterContext.Provider value={value}>
      {children}
    </LetterContext.Provider>
  );
};
