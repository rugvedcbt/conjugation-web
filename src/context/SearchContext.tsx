import React, { createContext, useContext, useState, ReactNode } from 'react';


interface SearchContextType {
    searchedWords: string[];
    setSearchedWords: (searchedWords: string[]) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchedWords: [],
  setSearchedWords: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
    const [searchedWords, setSearchedWords] = useState<string[]>([]);
  
    const value: SearchContextType = {
      searchedWords,
      setSearchedWords,
    };
  
    return (
      <SearchContext.Provider value={value}>
        {children}
      </SearchContext.Provider>
    );
  };
  
