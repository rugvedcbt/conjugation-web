import React, { createContext, useContext, useState } from 'react';

interface AudioContextProps {
  children: React.ReactNode;
}

interface AudioContextValue {
  currentlyPlaying: HTMLAudioElement | null;
  setCurrentlyPlaying: (audio: HTMLAudioElement | null) => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export const useAudioContext = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioContextProvider');
  }
  return context;
};

export const AudioContextProvider: React.FC<AudioContextProps> = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<HTMLAudioElement | null>(null);

  return (
    <AudioContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
