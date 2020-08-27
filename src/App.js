import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    counter: 0
  }
  render () {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">This is a counter</h1>
        <button data-test="increment-button">Increment counter</button>
      </div>
    );
  }
}

export default App;
