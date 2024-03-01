import React, { useRef,useState, useEffect } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useAudioContext } from '../context/AudioContext';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentlyPlaying, setCurrentlyPlaying } = useAudioContext();

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleEnded = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    if (audio) {
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const handleTogglePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
      }

      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }

      setCurrentlyPlaying(audio);
    }
  };

  return (
    <>
      <span className='audio-icon' onClick={handleTogglePlay}>
        {audioRef.current && !audioRef.current.paused && isPlaying ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </span>
      <audio ref={audioRef} src={src} />
    </>
  );
};

export default AudioPlayer;

