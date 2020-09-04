import { combineReducers } from 'redux'
import success from './successReducer'
import guessWords from './guessWordsReducer'

export default combineReducers({
  success,
  guessWords
})