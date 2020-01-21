import React from 'react';

// internal dependencies
//
import Button from 'components/button';

const Header = (props) => {
  return (
    <>
      <div className="header__container">
        <div className="header">
          <div className="header-content__wrapper">
            <div className="left">
              <h2>
                Remote <span className="main-green">Contracts</span>.
              </h2>
            </div>

            <div className="right">
              <Button secondary text="Post A Contract" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
