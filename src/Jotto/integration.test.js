import { storeFactory } from '../test/testUtil'
import { guessWord } from '../actions/index'

describe('guessWord action dispatcher', () => {
  const secretWord = 'party'
  const unsuccessfulGuess = 'train'
  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord }
    beforeEach(() => {
      // 先 initial secret word 到 store
      store = storeFactory(initialState)
    })
    test('updates state correctly for unsuccessful guess', () => {
      // 利用 store 提供的 API dispatch, getState 來調度 action 及取得 state
      store.dispatch(guessWord(unsuccessfulGuess))
      const newState = store.getState()
      // 再來寫個目前預期的結果
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          letterMatchCount: 3
        }]
      }
      expect(newState).toEqual(expectedState)
    })
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord))
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5
        }]
      }
      expect(newState).toEqual(expectedState)
    })
  })
  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'Jack', letterMatchCount: 1 }]
    const initialState = { guessedWords, secretWord }
    let store;
    beforeEach(() => {
      store = storeFactory(initialState)
    })
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess))
      const newState = store.getState()
      const expectedState = {
        ...initialState,
        success: false,
        secretWord,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3
          }
        ]
      }
      expect(newState).toEqual(expectedState)
    })
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord))
      const newState = store.getState()
      const expectedState = {
        ...initialState,
        success: true,
        secretWord,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }
        ]
      }
      expect(newState).toEqual(expectedState)
    })
  })
})