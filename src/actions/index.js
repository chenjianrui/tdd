export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD'
}

export const correctGuess = () => {
  return {
    type: actionTypes.CORRECT_GUESS
  }
}

export const guessWord = (guessedWord) => (dispatch, getState) => {
  return {
    type: actionTypes.GUESS_WORD,
    payload: guessedWord
  }
}