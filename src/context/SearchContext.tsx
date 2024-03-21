import React, { createContext, useContext, useState, ReactNode } from 'react';


interface SearchContextType {
    searchedWords: string[];
    setSearchedWords: (searchedWords: string[]) => void;
    searchWord: string;
    setSearchWord: (verb: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchedWords: [],
  setSearchedWords: () => {},
  searchWord: '',
  setSearchWord: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
    const [searchedWords, setSearchedWords] = useState<string[]>([]);
    const [searchWord, setSearchWord] = useState<string>('');

  
    const value: SearchContextType = {
      searchedWords,
      setSearchedWords,
      searchWord,
      setSearchWord,
    };
  
    return (
      <SearchContext.Provider value={value}>
        {children}
      </SearchContext.Provider>
    );
  };
  
