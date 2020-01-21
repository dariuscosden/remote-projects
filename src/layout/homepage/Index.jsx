import React, { useEffect } from 'react';

// internal dependencies
//
import Header from 'components/header';
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import TextInput from 'components/text-input';

const Homepage = (props) => {
  // particles js
  useEffect(() => {
    particlesJS.load(
      'particles-js',
      'assets/js/particles-js/particles.json',
      function() {
        console.log('callback - particles.js config loaded');
      },
    );
  }, []);

  return (
    <>
      <div id="particles-js" />

      <Header />

      <div className="homepage">
        <div className="homepage-header">
          <h1>Remote Contracts.</h1>
          <p>Find fixed-term, remote contract work. No permanent jobs.</p>

          <TextInput placeholder="ex. react" />

          <ButtonGroup>
            <Button secondary text="Post a contract for $299" />
            <Button text="Find a contract" />
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Homepage;
