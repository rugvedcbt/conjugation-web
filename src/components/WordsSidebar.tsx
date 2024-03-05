import React from 'react';
import { useLetterContext } from '../context/LetterContext';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import AudioPlayer from './AudioPlayer';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from './Sidebar';
import { useAudioContext } from '../context/AudioContext';
import Audio1 from '../audio/audio1.mp3'
import Audio2 from '../audio/audio2.mp3'

export default function WordsSidebar() {
  const {
    verb,
    mobile,
    setMobile,
    loading,
    wordData,
  } = useLetterContext();

  const { currentlyPlaying } = useAudioContext();

  const handleBackIcon = () => {
    setMobile(false);
    currentlyPlaying?.pause();
  };

  return (
    <div className='words-main-bar'>
      <Sidebar />
      <div className={`words-content ${mobile ? '' : 'mobile-content'}`}>
        {wordData.length === 0 ? (
          <div className='data-notfound'>

            {verb ? (
              <div>
                {wordData.length === 0 && loading ? (
                  <p className='no-verb'>
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  </p>
                ) : (
                  <div className={`verb-head ${!mobile ? '' : 'message'}`} >
                    <h4 className={`card-header word ${!mobile ? '' : 'message'}`}>
                      <span className={!mobile ? 'back-icon' : 'back-icon-mobile'} onClick={handleBackIcon}>
                        <ArrowBackOutlinedIcon />
                      </span>
                      <div className='verb'>{verb}</div>
                    </h4>
                    <div className="card-message">
                      <p>Oops! Content not Available.</p>
                    </div>
                  </div>
                )}
              </div>) : (<div className={`card-message verb-head ${!mobile ? '' : 'message'}`} ><p>Start selecting a word... </p></div>)}

          </div>
        ) : (
          <div>
            <div className="word-head">
              <h4 className="card-header word">
                <span className={!mobile ? 'back-icon' : 'back-icon-mobile'} onClick={handleBackIcon}>
                  <ArrowBackOutlinedIcon />
                </span>
                <div className='verb'>{verb}</div>
              </h4>
            </div>


            {/* base verb & infinitive */}
            <div className="banner-container mt-3 mb-3 indicative-topbanner" id="featured">
              <div className="container-fluid px-4 py-4">
                <div className="card  text-white shadow-lg ">
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body" key={index}>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col baseverb">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.baseVerb.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    <p className="card-text">{item.baseVerb.data.text}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col infinitive">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.infinitive.displayText}
                                  <AudioPlayer src={Audio2} /></div>
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

            {/* indicative */}
            <div className="banner-container mt-5 mb-5" id="featured">
              <div className="container-fluid px-4 py-4">
                <div className="card  text-white shadow-lg ">
                  {wordData.map((item: any, index: number) => (
                    <>
                      <h4 className="card-header" key={index}>{item.indicative.displayText}</h4>
                      <div className="card-body">
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col positive-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.positiveSentences.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.present.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.present.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.present.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.present.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.present.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col negative-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.positiveSentences.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>

                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.past.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.past.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.past.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.past.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.past.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.past.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col negative-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.positiveSentences.types.future.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.future.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.future.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.future.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.future.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.future.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.positiveSentences.types.future.data.setThey.map((texttense: any, index: number) => (
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

                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.indicative.indicativeTypes.negativeSentences.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col negative-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.negativeSentences.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.present.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.present.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.present.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.present.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.present.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col negative-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.negativeSentences.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.past.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.past.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.past.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.past.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.past.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.past.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col negative-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.negativeSentences.types.future.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.future.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.future.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.future.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.future.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.future.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.negativeSentences.types.future.data.setThey.map((texttense: any, index: number) => (
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

                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.indicative.indicativeTypes.imperativeSentence.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.imperativeSentence.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.imperativeSentence.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicative.indicativeTypes.imperativeSentence.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicative.indicativeTypes.imperativeSentence.types.past.data.setYou.map((texttense: any, index: number) => (
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

            {/* MODEL FORM */}
            <div classNaback-icon-mobileme="banner-container mt-5 mb-5" id="featured">
              <div className="container-fluid px-4 py-4">
                <div className="card indicative  text-white shadow-lg ">

                  {/* model form --------> Express Obligation/Desire(Need to) */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <h4 className="card-header" key={index}>{item.modelforms.displayText}</h4>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.modelforms.modalFormTypes.needto.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.needto.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.present.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.present.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.present.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.present.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.present.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.needto.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.past.data.notsetI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.past.data.notsetWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.past.data.notsetYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.past.data.notsetHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.past.data.notsetShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.needto.types.past.data.notsetThey.map((texttense: any, index: number) => (
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


                  {/* model form --------> Ability to do an action(Can) */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.modelforms.modalFormTypes.can.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.can.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.present.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.present.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.present.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.present.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.present.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.can.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.past.data.notsetI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.past.data.notsetWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.past.data.notsetYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.past.data.notsetHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.past.data.notsetShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.can.types.past.data.notsetThey.map((texttense: any, index: number) => (
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


                  {/* model form --------> Probability of an action(May) */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.modelforms.modalFormTypes.may.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-sub-header">{item.modelforms.modalFormTypes.may.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.present.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.present.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.present.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.present.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.present.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-sub-header">{item.modelforms.modalFormTypes.may.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.past.data.notsetI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.past.data.notsetWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.past.data.notsetYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.past.data.notsetHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.past.data.notsetShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.may.types.past.data.notsetThey.map((texttense: any, index: number) => (
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


                  {/* model form --------> After attempting something(Able to) */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.modelforms.modalFormTypes.ableto.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.ableto.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.present.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.present.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.present.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.present.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.present.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.ableto.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.past.data.notsetI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.past.data.notsetWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.past.data.notsetYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.past.data.notsetHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.past.data.notsetShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.ableto.types.past.data.notsetThey.map((texttense: any, index: number) => (
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


                  {/* model form --------> Permission(Let) */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.modelforms.modalFormTypes.let.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.let.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.let.types.present.data.setHim.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.let.types.present.data.setHer.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.let.types.present.data.setThem.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.let.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.let.types.past.data.notsetHim.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.let.types.past.data.notsetHer.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.let.types.past.data.notsetThem.map((texttense: any, index: number) => (
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

                  {/* model form --------> Recommendation/opinion(Should) */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <h5 className="card-sub-header" key={index}>{item.modelforms.modalFormTypes.should.displayText}</h5>
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.should.types.present.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.present.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.present.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.present.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.present.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.present.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.present.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.modelforms.modalFormTypes.should.types.past.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.past.data.notsetI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.past.data.notsetWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.past.data.notsetYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.past.data.notsetHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.past.data.notsetShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.modelforms.modalFormTypes.should.types.past.data.notsetThey.map((texttense: any, index: number) => (
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

            {/* indicativeOtherForms */}
            <div className="banner-container mt-5 mb-5" id="featured">
              <div className="container-fluid px-4 py-4">
                <div className="card  text-white shadow-lg ">

                  {/* presentProgressive , pastProgressive, futureProgressive */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <h4 className="card-header" key={index}>{item.indicativeOtherForms.displayText}</h4>
                      <div className="card-body">
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col progressive-sentences">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.presentProgressive.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentProgressive.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentProgressive.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentProgressive.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentProgressive.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentProgressive.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentProgressive.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col progressive-sentences">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.pastProgressive.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastProgressive.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastProgressive.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastProgressive.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastProgressive.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastProgressive.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastProgressive.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col progressive-sentences">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.futureProgressive.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futureProgressive.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futureProgressive.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futureProgressive.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futureProgressive.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futureProgressive.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futureProgressive.data.setThey.map((texttense: any, index: number) => (
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

                  {/* presentPerFect, pastPerfect, futurePerfect */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfect.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfect.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfect.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfect.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfect.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfect.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfect.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfect.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfect.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfect.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfect.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfect.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfect.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfect.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfect.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfect.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfect.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfect.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfect.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfect.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfect.data.setThey.map((texttense: any, index: number) => (
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

                  {/* presentPerfectProgressive, pastPerfectProgressive, futurePerfectContinuous */}
                  {wordData.map((item: any, index: number) => (
                    <>
                      <div className="card-body">
                        <div className="conatiner">
                          <div className="row d-flex justify-content-around">
                            <div className="col perfect-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfectProgressive.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfectProgressive.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfectProgressive.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfectProgressive.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfectProgressive.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfectProgressive.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.presentPerfectProgressive.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col perfect-sentence">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfectProgressive.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfectProgressive.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfectProgressive.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfectProgressive.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfectProgressive.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfectProgressive.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.pastPerfectProgressive.data.setThey.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="card text-black move-up mb-3" >
                                <div className="card-header">{item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfectContinuous.displayText}
                                  <AudioPlayer src={Audio1} /></div>
                                <div className="card-body">
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfectContinuous.data.setI.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfectContinuous.data.setWe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfectContinuous.data.setYou.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfectContinuous.data.setHe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfectContinuous.data.setShe.map((texttense: any, index: number) => (
                                      <p className="card-text" key={index}>{texttense.text}</p>
                                    ))}
                                  </div>
                                  <div className='setpara'>
                                    {item.indicativeOtherForms.indicativeOtherFormTypes.futurePerfectContinuous.data.setThey.map((texttense: any, index: number) => (
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