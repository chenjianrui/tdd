import React, { Component } from 'react'
import { connect } from 'react-redux'
import { guessWord } from '../actions'

export class UnconnectedInput extends Component {
  state = {
    currentGuess: ''
  }

  handleChange = e => {
    this.setState({
      currentGuess: e.target.value
    })
  }

  handleClick = e => {
    e.preventDefault()
    const { currentGuess } = this.state
    const { guessWord } = this.props
    guessWord(currentGuess)
    this.setState({ currentGuess: '' })
  }
  render () {
    const { currentGuess } = this.state
    const contents = this.props.success ? 
      null :
      (
        <form>
          <input 
            data-test="inputBox"
            type="text"
            placeholder="enter guess"
            value={currentGuess}
            onChange={this.handleChange}
          />
          <button
            onClick={this.handleClick}
            data-test="submitButton" 
            type="submit"
          >
            Submit
          </button>
        </form>
      )
    return (
      <div data-test="componentInput">
        {contents}
      </div>
    )
  }
}

const mapStateToProps = ({ success }) => {
  return { success }
}

export default connect(mapStateToProps, { guessWord })(UnconnectedInput)