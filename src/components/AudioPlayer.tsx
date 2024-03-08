import React, { useRef,useState, useEffect } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useAudioContext } from '../context/AudioContext';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

interface AudioPlayerProps {
  src: string;
  id?:string;
  handleSelectedID: (id: string) => void;
  selectedId?: string;
}

interface ModalProps {
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, id, handleSelectedID, selectedId }) => {
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
    if (audio) {
      audio.volume = 0.5; // Set the default volume to 0.5 (50%)
    }
  }, []);

  const handleTogglePlay = (id: any) => {
    handleSelectedID(id)
    if(id != selectedId) {
      setShowControls(true);
    } else {
      setShowControls(previous => !previous);
    }
  };
  
  return (
    <>
      <span className='audio-icon' >
        <VolumeUpIcon onClick={() => {handleTogglePlay(id)}}/>
      </span>
      <audio ref={audioRef} src={src} />
      <div className='audioref-controls'>
        {showControls && (selectedId == id) &&<audio ref={audioRef} src={src} controls controlsList="nodownload"/>}
      </div>
    </>
  );
};

export default AudioPlayer;