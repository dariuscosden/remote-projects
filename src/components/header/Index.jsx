import React from 'react';

// internal dependencies
//
import Button from 'components/button';

import history from 'utils/history';

const Header = (props) => {
  return (
    <>
      <div className="header__container">
        <div className="header">
          <div className="header-content__wrapper">
            <div className="left">
              <h2>
                Remote <span className="main-green">Projects</span>.
              </h2>
            </div>

            <div className="right">
              <Button
                secondary
                text="Post A Project"
                onClick={() => history.push('/post')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
