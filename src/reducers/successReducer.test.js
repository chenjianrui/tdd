import successReducer from './successReducer'
import { actionTypes } from '../actions/index'
test('returns default initial state of `false` when no action is passed', () => {
  const newState = successReducer(undefined, {})
  expect(newState).toEqual(false)
})
test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
  const newState = successReducer(undefined, { type: actionTypes.CORRECT_GUESS })
  expect(newState).toEqual(true)
})