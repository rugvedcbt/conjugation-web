import React, { useRef,useState, useEffect } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useAudioContext } from '../context/AudioContext';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

interface AudioPlayerProps {
  src: string;
}

interface ModalProps {
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef:any = useRef<HTMLAudioElement>(null);
  const { currentlyPlaying, setCurrentlyPlaying } = useAudioContext();
  const [showControls, setShowControls] = useState(false);

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

  useEffect(() => {
    const audio = audioRef.current;
    console.log('useeffect...')
    if (audio) {
      audio.volume = 0.5; // Set the default volume to 0.5 (50%)
    }
  }, []);

  const handleTogglePlay = () => {
    setShowControls(previous => !previous);
  };
  
  return (
    <>
      <span className='audio-icon' >
        <VolumeUpIcon onClick={handleTogglePlay}/>
      </span>
      {showControls}
      <audio ref={audioRef} src={src} />
      <div className='audioref-controls'>
        {showControls && <audio ref={audioRef} src={src} controls controlsList="nodownload"/>}
      </div>
    </>
  );
};

export default AudioPlayer;