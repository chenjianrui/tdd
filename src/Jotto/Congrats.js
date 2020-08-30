import React from 'react'

const Congrats = ({ success }) => {
  return (
    <>
      {
        success ? 
          <div data-test="component-congrats">
            <span data-test="congrats-message">
            Congratulations! You guessed the word!
            </span>
          </div> :
          <div data-test="component-congrats"></div>
      }
    </>
  )
}

export default Congrats
