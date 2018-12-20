import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DemoComponent from './DemoComponent';
import store from '../redux/store';

// main app component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DemoComponent />
      </Provider>
    );
  }
}

export default App;
