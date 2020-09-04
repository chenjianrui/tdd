import React, { Component } from 'react'
import { connect } from 'react-redux'

class Input extends Component {
  render () {
    const contents = this.props.success ? 
      null :
      (
        <form>
          <input 
            data-test="inputBox"
            type="text"
            placeholder="enter guess"
          />
          <button
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

export default connect(mapStateToProps)(Input)