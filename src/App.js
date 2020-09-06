import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

import Congrats from './Jotto/Congrats'
import GuessedWords from './Jotto/GuessedWords'
import Input from './Jotto/Input'
import { getSecretWord } from './actions'

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
    const { success, guessedWords } = this.props
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">This is a counter {this.state.counter}</h1>
        <button onClick={this.handleIncrement} data-test="increment-button">Increment counter</button>
        <button onClick={this.handleDecrement} data-test="decrement-button">Decrement counter</button>
        <p className={errorClass} data-test="error-message">Counter can not less than 0</p>
        <h2>Jotto</h2>
        <Congrats success={success}/>
        <Input />
        <GuessedWords guessedWords={guessedWords}/>
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => {
  return {
    success,
    guessedWords,
    secretWord
  }
}

export default connect(mapStateToProps, { getSecretWord })(App);
