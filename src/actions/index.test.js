import moxios from 'moxios'
import { actionTypes, correctGuess } from './index'

import { storeFactory } from '../test/testUtil'
import { getSecretWord } from './'

describe('correctGuess', () => {
  test('returns an action with type `CORRECT_GUESS`', () => {
    const action = correctGuess()
    // toBe 會用 `===` 去比較，雖然看起來都是 Object，但記憶體位置不同，所以會測試不過
    // 用 toEqual
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS })
  })
})

describe('getSecretWord action creator', () => {
  // 在每次測試時先安裝 moxios，跑完再移除
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('adds response word to state', async () => {
    // 模擬 moxios 傳回來的 secret word
    const secretWord = 'party'
    const store = storeFactory();
    // 模擬請求後 API 要回應什麼
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: secretWord
      })
    })
    // 最後 dispatch action creator 後會回傳 promise
    await store.dispatch(getSecretWord())
    const newState = store.getState();
    expect(newState.secretWord).toBe(secretWord)

  })
})