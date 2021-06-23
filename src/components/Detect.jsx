import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
// import { Link } from 'react-router-dom';

import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  // handleCityReturn,
  // handleCity,
  staggerRevealClose,
} from './Animations';
import { Button } from '@material-ui/core';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NestedList from './NestedList';
import ChartComponent from './Chart';
const CircularProgressWithLabel = props => {
  return (
    <Box
      position="relative"
      display="inline-flex"
      // style={{ width: 50, height: 50 }}
    >
      <CircularProgress size={70} variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
const Detect = ({ state, domain }) => {
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  // let cityBackground = useRef(null);
  let line1 = useRef(null);
  const [progress, setProgress] = React.useState(10);
  // let line2 = useRef(null);
  // let line3 = useRef(null);
  let info = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [Txt, setTxt] = useState('');
  const [Image, setImage] = useState('');
  const [ResultServer, setResultServer] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isChart, setIsChart] = useState(false);

  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
      gsap.to(menuLayer, { duration: 1, css: { display: 'none' } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
      gsap.to(menuLayer, { duration: 0, css: { display: 'block' } });
      //Allow menu to have height of 100%
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: '100%',
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1);
    }
  }, [state]);
  const handleUpdateFiles = ({ target: { files } }) => {
    console.log('adsa');
    console.log(files[0]);
    setFile(files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setFileUrl(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSentFiles = () => {
    console.log(file);
    setIsSent(true);
    let data = new FormData();
    data.append('files', file);
    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const option = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(percent);
        setProgress(percent);
      },
    };
    axios
      .post(`${domain}/uploadfilesjs/`, data, option)
      .then(response => {
        setImage(`${domain}/${response.data.result.path}`);
        setTxt(response.data.result.result);
        setResultServer(response.data.result.total_e_array);
        console.log(Image, Txt, ResultServer);
      })
      .catch(error => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
  };
  return (
    <div ref={el => (menuLayer = el)} className="hamburger-menu">
      <div
        ref={el => (reveal1 = el)}
        className="menu-secondary-background-color"
      ></div>
      <div ref={el => (reveal2 = el)} className="menu-layer">
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                {ResultServer ? (
                  <ul>
                    <li style={{ height: 'auto' }}>
                      <div ref={el => (line1 = el)}>
                        {!isChart ? (
                          <NestedList list={ResultServer} />
                        ) : (
                          <ChartComponent result={ResultServer} />
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          onClick={() => setIsChart(!isChart)}
                        >
                          View {isChart ? 'Chart' : 'List'}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          onClick={() => {
                            setResultServer('');
                            setFile(null);
                            setIsSent(false);
                            setImage('');
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li></li>
                    <li>
                      <div
                        style={{
                          width: file ? 500 : 0,
                          height: file ? 500 : 0,
                          display: 'flex',
                          position: 'inherit',
                        }}
                      >
                        {file ? (
                          <div
                            style={{
                              height: 500,
                              width: 500,
                              opacity: isSent ? 0.4 : 1,
                              boxShadow: '0px 0px 42px -13px #7a7a7a',
                              borderRadius: 20,
                              backgroundImage: `url(${fileUrl})`,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                            }}
                          ></div>
                        ) : (
                          <></>
                        )}

                        <div
                          style={{
                            borderRadius: 20,
                            // opacity: 0.5,
                            position: 'absolute',
                            // backgroundColor: 'black',
                            width: '100%',
                            height: '100%',
                            display: 'grid',
                          }}
                        >
                          <div
                            style={{
                              display: isSent ? 'grid' : 'none',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {progress !== 100 ? (
                              <CircularProgressWithLabel value={progress} />
                            ) : (
                              <CircularProgress size={70} disableShrink />
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        onMouseEnter={e => handleHover(e)}
                        onMouseOut={e => handleHoverExit(e)}
                        ref={el => (line1 = el)}
                      >
                        {file ? (
                          <div
                            className="container_btn"
                            style={{ display: 'flex' }}
                          >
                            <div>
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                onClick={handleSentFiles}
                              >
                                sent and detect
                              </Button>
                            </div>
                            <div>
                              <input
                                onChange={handleUpdateFiles}
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                multiple
                                type="file"
                              />
                              <label htmlFor="contained-button-file">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  Upload
                                </Button>
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input
                              onChange={handleUpdateFiles}
                              accept="image/*"
                              style={{ display: 'none' }}
                              id="contained-button-file"
                              multiple
                              type="file"
                            />
                            <label htmlFor="contained-button-file">
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Upload
                              </Button>
                            </label>
                          </div>
                        )}
                      </div>
                    </li>
                    <li></li>
                  </ul>
                )}
              </nav>
              <div ref={el => (info = el)} className="info">
                <h3 style={{ color: 'black' }}>Result</h3>
                {/* <p style={{ color: 'black' }}>{Txt}</p> */}
                {Image ? (
                  <nav>
                    <div
                      className="container-box-image"
                      style={{ height: 'auto' }}
                    >
                      <div className="box">
                        <img alt="result" src={Image}></img>
                      </div>
                    </div>
                  </nav>
                ) : (
                  <></>
                )}
              </div>
              {/* <div className="locations">About us:</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detect;
