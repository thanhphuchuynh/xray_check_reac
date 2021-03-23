import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Detect from './Detect';
const Header = ({ history }) => {
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: 'Menu',
  });
  // State of our button
  const [disabled, setDisabled] = useState(false);
  const [domain, setDomain] = useState('');
  const [isDomain, setIsDomain] = useState(false);
  //Use Effect
  useEffect(() => {
    // console.log(domain);
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
  const handleEnter = value => {
    if (value.keyCode === 13) {
      console.log('Dasd', domain);
      setIsDomain(true);
    }
  };
  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <div className="inner-header">
            <div className="logo">
              <Link to="/">ABNORMALITIES DETECTION.</Link>
            </div>
            <div className="menu" style={{ display: 'flex' }}>
              {isDomain ? (
                <p style={{ marginTop: 15 }}>{domain}</p>
              ) : (
                <TextField
                  onKeyUp={handleEnter}
                  onChange={value => {
                    // console.log(value);
                    setDomain(value.target.value);
                  }}
                  id="standard-basic"
                  label="Domain Server"
                />
              )}

              <button disabled={disabled} onClick={handleMenu}>
                {state.menuName}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Detect state={state} domain={domain} />
    </header>
  );
};
export default withRouter(Header);
