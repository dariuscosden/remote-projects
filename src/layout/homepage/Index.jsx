import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import Header from 'components/header';
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import TextInput from 'components/text-input';
import ContractCard from 'components/contract-card';
import Footer from 'components/footer';

import history from 'utils/history';

import { fetchContracts } from 'state/contracts/actions';

const Homepage = (props) => {
  const { contracts, homepage, fetchContracts } = props;

  // particles js
  useEffect(() => {
    particlesJS.load(
      'particles-js',
      'assets/js/particles-js/particles.json',
      function() {},
    );
  }, []);

  // contracts
  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <>
      <div id="particles-js" />

      <Header />

      <div className="homepage">
        <div className="homepage-header">
          <h1>Remote Contracts.</h1>
          <p>Find fixed-term, remote contract work. No permanent jobs.</p>

          <TextInput placeholder="ex. react, vuejs, python, go, php" />

          <ButtonGroup>
            <Button
              secondary
              text="Post a contract for $249"
              onClick={() => history.push('/post')}
            />
            <Button text="Find a contract" />
          </ButtonGroup>
        </div>

        <div className="homepage-contracts">
          <h1>Contracts</h1>
          {homepage.fetched ? (
            <>
              {homepage.contracts.map((c) => {
                const contract = contracts[c];
                return <ContractCard key={c} contract={contract} />;
              })}
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  contracts: state.entities.contracts,
  homepage: state.homepage,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContracts: () => dispatch(fetchContracts()),
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
