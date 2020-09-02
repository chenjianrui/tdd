import React from 'react'
import PropTypes from 'prop-types'

const GuessedWords = ({ guessedWords }) => {
  let contents;
  if(guessedWords.length === 0){
    contents = (
      <span data-test="component-instructions">
        Try to guess the secret word!
      </span>
    )
  } else {
    const guessedWordsList = guessedWords.map((item, index) => (
      <tr key={index} data-test="guessedWord">
        <td>{item.guessedWord}</td>
        <td>{item.letterMatchCount}</td>
      </tr>
    ))
    contents = (
      <div data-test="guessedWords">
        <h3>Guessed Words</h3>
        <table>
          <thead>
            <tr>
              <th>Guess</th>
              <th>Matching Letters</th>
            </tr>
          </thead>
          <tbody>
            { guessedWordsList }
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div data-test="component-guessedWords">
      { contents }
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
