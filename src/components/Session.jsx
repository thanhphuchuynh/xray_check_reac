/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Picture from '../assets/picture_home.jpg';
const Header = ({ history }) => {
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: 'Menu',
  });
  // State of our button
  const [disabled, setDisabled] = useState(false);

  //Use Effect
  useEffect(() => {
    //Listening for page changes.
    history.listen(() => {
      setState({ clicked: false, menuName: 'Menu' });
    });
  }, [history]);

  // Toggle menu
  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: 'Close',
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: 'Menu',
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: 'Close',
      });
    }
  };

  //Determine if out menu button should be disabled
  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  return (
    <div className="container-session">
      <div className="left-session">
        <div
          className="left-session-content"
          style={{
            // position: 'absolute',
            justifyContent: 'center',
            left: 0,
            // width: '40%',
            height: '100%',
          }}
        >
          <h5
            style={{
              position: 'absolute',
              fontSize: '30px',
              width: '70%',
              margin: 'auto',
              marginTop: '18%',
              paddingLeft: '10%',
              mixBlendMode: 'difference',
              textShadow: 'black 0.1em 0.1em 0.2em',
              color: '#ffffffad',
              zIndex: 2,
            }}
          >
            The <br />
            <br />
            <b>
              <span style={{ fontSize: 40, textTransform: 'uppercase' }}>
                Chest X-ray Abnormalities Detection
              </span>
            </b>
            <br></br>
            <span
              style={{
                fontSize: 20,
                marginLeft: 25,
                display: 'block',
                margin: 20,
                fontWeight: 'lighter',
                textAlign: 'right',
              }}
            >
              {' '}
              <p>
                You’ll automatically localize and classify 14 types of thoracic
                abnormalities from chest radiographs.An open dataset of chest
                X-rays with radiologist's annotations”.
              </p>
            </span>
          </h5>
        </div>
      </div>
      <div className="right-session">
        <div
          className="content-right-session"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60%',
            height: '100%',
          }}
        ></div>
      </div>
    </div>
  );
};
export default withRouter(Header);
