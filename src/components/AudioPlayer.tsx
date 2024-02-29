import React, { useRef, useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useAudioContext } from '../context/AudioContext';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentlyPlaying, setCurrentlyPlaying } = useAudioContext();

  const handleTogglePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
      }

      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }

      setPlay(!play);
      setCurrentlyPlaying(audio);
    }
  };

  return (
    <>
      <span className='audio-icon' onClick={handleTogglePlay}>
        {play ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </span>
      <audio ref={audioRef} src={src} />
    </>
  );
};

export default AudioPlayer;
