import React, { useState, useEffect, useRef } from 'react';
import { useLetterContext } from '../context/LetterContext';
import { alphapeticLettersData } from '../constants/AlbhapeticLetterList';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import myAudioFile from './../audio/simple-present-audio.mp3'; 


export default function WordsSidebar() {
  interface WordData {
    word: string;
    // Add other properties if needed
  }
  interface WordItem {
    word: string;
    baseVerb: any;
    infinitive: any;
    indicative: any;
    negativeSentences: any;
    impretiveSentence: any;
    modelforms: any;
    presentProgressive: any;
    // Add other properties if needed
  }
  
  const [getJsonData, setJsonData] = useState<WordItem[]>([]);
  const [verb, setVerb] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleWordChange = (word: string) => {
    setVerb(word);
  };

  useEffect(() => {
    getJsonWordsData()
    
  },[verb])

  const getJsonWordsData = () => {
    fetch('json/words.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(Json) {
        const wordResponseData = Json.data;
        const filteredData = wordResponseData.filter((item: WordData) => {
          return item.word === verb;
        });
        setJsonData(filteredData)
      })
  }

  const audioClick = () => {
    const audio = new Audio(myAudioFile);
    audio.play();
    // if (isPlaying) {
    //   audioRef?.current?.pause();
    // } else {
    //   audioRef?.current?.play();
    // }
    // setIsPlaying(!isPlaying);

    // const audio = audioRef.current;
    // if (audio) {
    //   console.log('audio start..')
    //   const playPromise = audio.play();
    //   if (playPromise !== undefined) {
    //     playPromise
    //       .then(() => {
    //         // Playback started successfully
    //       })
    //       .catch(error => {
    //         console.error('Error playing audio:', error);
    //       });
    //   }
    // }
  };

  const { currentLetter } = useLetterContext()
  const letterValues = alphapeticLettersData[currentLetter];
  return (
  <div className='words-main-bar'>
    <div className='sidebar'>
        {letterValues && (
          <ul>
            {letterValues.map((value, index) => (
              <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary={value} key={index} onClick={() => handleWordChange(value)}/>
              </ListItemButton>
            </ListItem>
            ))}
          </ul>
        )}
        {!letterValues && (
          <ul>
           {Object.keys(alphapeticLettersData).map((letter, index) => (
            <div key={index}>
              <ul>
                {alphapeticLettersData[letter].map((value, valueIndex) => (
                  <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StarBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary={value} key={valueIndex} onClick={() => handleWordChange(value)}/>
                  </ListItemButton>
                  </ListItem>
                ))}
              </ul>
            </div>
          ))}
          </ul>
        )}
     </div>
    <div className='words-content'>
      {getJsonData.length === 0 ? (
        // Render this div if getJsonData is empty
        <div className='data-notfound'>
          {verb ? (<p>No data available for {verb}.</p>):(<p>No data available. </p>)}
          
        </div>
      ) : (
      <div>
      <div className="banner-container mt-5 mb-5 indicative-topbanner" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                <div className="card-header">{item.baseVerb.displayText}</div>
                    <div className="card-body">
                    <div className='setpara'>
                        <p className="card-text">{item.baseVerb.data.text}</p>
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                <div className="card-header">{item.infinitive.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                        <p className="card-text">{item.infinitive.data.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>
      <div className="banner-container mt-5 mb-5" id="featured">
        <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.indicative.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                    {/* <audio ref={audioRef}>
                    <source src="./../audio/simple-present-audio.mp3" />
                    Your browser does not support the audio element.
                    </audio>
                  <button onClick={audioClick}>
                    {isPlaying ? 'Pause' : 'Play'}
                  </button> */}
                    <div className="card-header">{item.indicative.types.present.displayText}
                    <span className='audio-icon'> <AudiotrackIcon onClick={audioClick}></AudiotrackIcon></span></div>
                    <div className="card-body">
                    <div className='setpara'>
                    {item.indicative.types.present.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.present.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.present.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.present.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.present.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.present.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.indicative.types.past.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.indicative.types.past.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.past.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.past.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.past.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.past.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.past.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.indicative.types.future.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.indicative.types.future.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.future.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.future.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.future.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.future.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.indicative.types.future.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.negativeSentences.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.negativeSentences.present.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.present.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.present.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.present.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.present.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.present.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                  <div className="card-body">
                    <div className='setpara'>
                    {item.negativeSentences.past.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.past.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.past.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.past.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.past.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.past.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                  <div className="card-body">
                    <div className='setpara'>
                    {item.negativeSentences.future.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.future.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.future.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.future.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.future.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.negativeSentences.future.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.impretiveSentence.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.negativeSentences.present.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                  <div className="card-body">
                    <div className='setpara'>
                    {item.negativeSentences.past.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>


      {/* model form --------> Express Obligation/Desire(Need to) */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.modelforms.types.needto.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.notsetI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.notsetWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.notsetYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.notsetHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.notsetShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.needto.data.notsetThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> Ability to do an action(Can) */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.modelforms.types.can.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.can.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.can.data.notsetI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.notsetWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.notsetYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.notsetHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.notsetShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.can.data.notsetThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> Probability of an action(May) */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.modelforms.types.may.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.may.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.may.data.notsetI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.notsetWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.notsetYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.notsetHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.notsetShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.may.data.notsetThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> After attempting something(Able to) */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.modelforms.types.ableto.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.notsetI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.notsetWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.notsetYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.notsetHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.notsetShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.ableto.data.notsetThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> Permission(Let) */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.modelforms.types.let.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.let.data.setHim.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.let.data.setHer.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.let.data.setThem.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.let.data.notsetHim.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.let.data.notsetHer.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.let.data.notsetThem.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> Recommendation/opinion(Should) */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.modelforms.types.should.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.should.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.should.data.notsetI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.notsetWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.notsetYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.notsetHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.notsetShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.should.data.notsetThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> Present progressive / continuous */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col progressive-sentences">
                <div className="card text-black move-up mb-3" >
                    <div className="card-header">{item.modelforms.types.presentProgressive.displayText}</div>
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.presentProgressive.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentProgressive.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentProgressive.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentProgressive.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentProgressive.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentProgressive.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col progressive-sentences">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.modelforms.types.pastProgressive.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.pastProgressive.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastProgressive.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastProgressive.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastProgressive.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastProgressive.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastProgressive.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col progressive-sentences">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.modelforms.types.futureProgressive.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.futureProgressive.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futureProgressive.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futureProgressive.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futureProgressive.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futureProgressive.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futureProgressive.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> Present perfect (simple) */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-header">{item.modelforms.types.presentPerfect.displayText}</div>
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfect.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfect.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfect.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfect.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfect.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfect.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.modelforms.types.pastPerfect.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfect.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfect.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfect.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfect.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfect.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfect.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.modelforms.types.futurePerfect.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfect.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfect.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfect.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfect.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfect.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfect.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> Present perfect progressive / continuous */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col perfect-sentence">
                <div className="card text-black move-up mb-3" >
                    <div className="card-header">{item.modelforms.types.presentPerfectProgressive.displayText}</div>
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfectProgressive.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfectProgressive.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfectProgressive.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfectProgressive.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfectProgressive.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.presentPerfectProgressive.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col perfect-sentence">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.modelforms.types.pastPerfectProgressive.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfectProgressive.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfectProgressive.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfectProgressive.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfectProgressive.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfectProgressive.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.pastPerfectProgressive.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      {/* model form --------> futurePerfectProgressive */}
      <div className="banner-container mt-5 mb-5" id="featured">
      <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-header">{item.modelforms.types.futurePerfectProgressive.displayText}</div>
                    <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfectProgressive.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfectProgressive.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfectProgressive.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfectProgressive.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfectProgressive.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.futurePerfectProgressive.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.modelforms.types.PerfectProgressive.displayText}</div>
                  <div className="card-body">
                    <div className='setpara'>
                    {item.modelforms.types.PerfectProgressive.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.PerfectProgressive.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.PerfectProgressive.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.PerfectProgressive.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.PerfectProgressive.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                    <div className='setpara'>
                    {item.modelforms.types.PerfectProgressive.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        ))}
      </div>
      </div>
      </div>

      </div>)}
    </div>
  </div>
  );
}