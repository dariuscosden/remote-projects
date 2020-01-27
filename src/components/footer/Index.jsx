import React from 'react';
import { NavLink } from 'react-router-dom';

// internal dependencie
//
import Button from 'components/button';

import history from 'utils/history';

const Footer = (props) => {
  const { hideTop } = props;

  return (
    <>
      <div className="footer-bg">
        <div className="footer">
          {!hideTop && (
            <div className="footer-top">
              <div className="footer-top__column">
                <NavLink to="/terms">Terms & Conditions</NavLink>
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              </div>
              <div className="footer-top__column right">
                <p>
                  Do you have a project that you need completed? We can help.
                </p>
                <Button
                  text="Post a Project"
                  onClick={() => history.push('/post/new-project')}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <span>Remote </span> <span className="main-purple">Projects.</span> | ©{' '}
        {new Date().getFullYear()}
      </div>
    </>
  );
};

export default Footer;
