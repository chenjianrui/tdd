import axios from 'axios'
import { getLetterMatchCount } from '../helpers'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD'
}

export const correctGuess = () => {
  return {
    type: actionTypes.CORRECT_GUESS
  }
}

export const guessWord = (guessedWord) => (dispatch, getState) => {
  const secretWord = getState().secretWord
  const letterMatchCount = getLetterMatchCount(guessedWord, secretWord)

  dispatch({
    type: actionTypes.GUESS_WORD,
    payload: { guessedWord, letterMatchCount }
  })

  if(guessedWord === secretWord){
    dispatch({ type: actionTypes.CORRECT_GUESS })
  }
}

export const getSecretWord = () => async dispatch => {
  // 測試時不會真的往這個 domain 打，將會打去 moxios
  const response = await axios.get('https://localhost:3030')
  dispatch({
    type: actionTypes.SET_SECRET_WORD,
    payload: response.data
  })
}