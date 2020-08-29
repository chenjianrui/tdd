import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    counter: 0,
    errorMsg: false
  }

  handleIncrement = () => {
    if(this.state.errorMsg){
      this.setState({ errorMsg: false })
    } 
    this.setState({ counter: this.state.counter + 1 })
  }
  handleDecrement = () => {
    if(this.state.counter === 0){
      this.setState({errorMsg: true})
    } else {
      this.setState({counter: this.state.counter - 1})
    }
  }
  render () {
    const errorClass = this.state.errorMsg ? '' : 'hidden'
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">This is a counter {this.state.counter}</h1>
        <button onClick={this.handleIncrement} data-test="increment-button">Increment counter</button>
        <button onClick={this.handleDecrement} data-test="decrement-button">Decrement counter</button>
        <p className={errorClass} data-test="error-message">Counter can not less than 0</p>
      </div>
    );
  }
}

export default App;
