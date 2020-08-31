import React from 'react'
import PropTypes from 'prop-types'

const GuessedWords = () => {
  return (
    <div data-test="component-guessedWords">
      
    </div>
  )
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
}

export default GuessedWords
