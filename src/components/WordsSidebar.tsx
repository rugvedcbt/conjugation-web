import React, { useState, useEffect } from 'react';
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
    // Add other properties if needed
  }
  
  const [getJsonData, setJsonData] = useState<WordItem[]>([]);
  const [verb, setVerb] = useState('');
  const handleWordChange = (word: string) => {
    setVerb(word);
    console.log('word...', word);
    // setCurrentLetter(word)
  };
  console.log('getJsonData...', getJsonData)
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
        console.log('response....', response)
        return response.json();
      })
      .then(function(Json) {
        const wordResponseData = Json.data;
        const filteredData = wordResponseData.filter((item: WordData) => {
          console.log('item.word...', item.word, verb)
          return item.word === verb;
        });
        console.log('filteredData....', filteredData)
        setJsonData(filteredData)
      })
  }

  const { currentLetter } = useLetterContext()
  const letterValues = alphapeticLettersData[currentLetter];
  return (
  <div className='words-main-bar'>
    <div className='words-side-menu'>
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
              // <li key={index}>&#9733; {value}</li>
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
      <div className="banner-container mt-5 mb-5" id="featured">
        <div className="container-fluid px-4 py-4">
        <div className="card bg-black text-white shadow-lg ">
          {getJsonData.map((item: WordItem, index: number) => (
          <>
          <h5 className="card-header" key={index}>{item.indicative.displayText}</h5>
          <div className="card-body">
            <div className="conatiner">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <div className="card text-black move-up mb-3" >
                    <div className="card-header">{item.indicative.types.present.displayText}</div>
                    <div className="card-body">
                    {item.indicative.types.present.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.present.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.present.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.present.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.present.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.present.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.indicative.types.past.displayText}</div>
                  <div className="card-body">
                  {item.indicative.types.past.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.past.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.past.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.past.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.past.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.past.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-black move-up mb-3" >
                  <div className="card-header">{item.indicative.types.future.displayText}</div>
                  <div className="card-body">
                  {item.indicative.types.future.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.future.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.future.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.future.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.future.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.indicative.types.future.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
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
                    {item.negativeSentences.present.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.present.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.present.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.present.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.present.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.present.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    </div>
                </div>
              </div>
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                  <div className="card-body">
                  {item.negativeSentences.past.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.past.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.past.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.past.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.past.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.past.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col negative-sentence">
                <div className="card text-black move-up mb-3" >
                  <div className="card-body">
                  {item.negativeSentences.future.data.setI.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.future.data.setWe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.future.data.setYou.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.future.data.setHe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.future.data.setShe.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
                    {item.negativeSentences.future.data.setThey.map((texttense: any, index: number) => (
                        <p className="card-text" key={index}>{texttense.text}</p>
                    ))}
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
    
    </div>
  </div>
  );
}