import { actionTypes, correctGuess } from './index'

describe('correctGuess', () => {
  test('returns an action with type `CORRECT_GUESS`', () => {
    const action = correctGuess()
    // toBe 會用 `===` 去比較，雖然看起來都是 Object，但記憶體位置不同，所以會測試不過
    // 用 toEqual
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS })
  })
})