import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

// external dependencies
//
const classNames = require('classnames');

// internal dependencies
//
import Button from 'components/button';

import history from 'utils/history';

const Header = (props) => {
  const { white, minimal } = props;

  const headerClassNames = classNames({
    header: true,
    'is-white': white,
  });

  return (
    <>
      <div className={headerClassNames}>
        <div className="header-content__wrapper">
          <div className="left">
            <div className="header-content__logo desktop">
              <h2 onClick={() => history.push('/')}>
                Remote <span className="main-green">Projects</span>.
              </h2>
            </div>

            <div
              className="header-content__logo mobile"
              onClick={() => history.push('/')}
            >
              {white ? (
                <img src="/assets/img/shared/logo-small.png" />
              ) : (
                <img src="/assets/img/shared/logo-small-white.png" />
              )}
            </div>
          </div>

          <div className="right">
            {!minimal && (
              <div className="header-content__menu">
                <div className="header-content__find-project">
                  <NavLink to="/">Find a Project</NavLink>
                </div>
                <Button
                  secondary
                  text="Post A Project"
                  onClick={() => history.push('/post/new-project')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Header);
