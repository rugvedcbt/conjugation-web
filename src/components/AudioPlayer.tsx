// AudioPlayer.tsx
import React, { useRef, useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTogglePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }

      setPlay(audio.paused);
    }
  };

  return (
    <>
      <span className='audio-icon' onClick={handleTogglePlay}>
        {!play ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </span>
      <audio ref={audioRef} src={src} />
    </>
  );
};

export default AudioPlayer;
