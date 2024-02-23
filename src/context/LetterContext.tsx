import React, { createContext, useContext, useState, ReactNode } from 'react';

const letterKeys =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Define a type for your context value
interface LetterContextType {
  letters: string[];
  currentLetter: string,
  setCurrentLetter: (currentLetter: string) => void
}

// Create a context with the initial value of your context
const LetterContext = createContext<LetterContextType>({
  letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  currentLetter: '',
  setCurrentLetter:() => null
});

// Create a custom hook to access the context
export const useLetterContext = () => useContext(LetterContext);

// Create a provider component
export const LetterContextProvider = ({ children } : { children: ReactNode }) => {
  const [ letters ] = useState<string[]>(letterKeys); // Initialize with an empty array
  const [ currentLetter, setCurrentLetter ] = useState<string>('A');
  // You might want to update the letters state somewhere in your component logic

  return (
    <LetterContext.Provider value={{ letters, currentLetter, setCurrentLetter }}>
      {children}
    </LetterContext.Provider>
  );
};