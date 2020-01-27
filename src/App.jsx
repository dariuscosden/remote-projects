import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import history from 'utils/history';

import store from './state/store';

import Layout from './layout';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StripeProvider apiKey="pk_test_07RGMUTSho0UwNJpDYUoQBIn00c1TOTRiD">
          <Router history={history}>
            <Layout />
          </Router>
        </StripeProvider>
      </Provider>
    );
  }
}

export default App;
