import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../test/testUtil'
import Input, { UnconnectedInput } from './Input'

const setup = (initialState = {}) => {
  const store = storeFactory(initialState)
  // 因為 shallow 是淺渲染，所以需要使用 enzyme 提供的 API dive 來往下找元件深層的 Node
  const wrapper = shallow(<Input store={store}/>).dive().dive()
  return wrapper
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false }
      // 將 initialState 傳入測試用的 storeFactory
      wrapper = setup(initialState)
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'componentInput')
      expect(component.length).toBe(1)
    })
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'inputBox')
      expect(inputBox.length).toBe(1)
    })
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submitButton')
      expect(submitButton.length).toBe(1)
    })
  })
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true }
      wrapper = setup(initialState)
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'componentInput')
      expect(component.length).toBe(1)
    })
    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'inputBox')
      expect(inputBox.length).toBe(0)
    })
    test('does not render submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submitButton')
      expect(submitButton.length).toBe(0)
    })
  })
})
// 測試從 redux store prop 是否如預期
describe('redux prop', () => {
  test('has success piece of state as prop', () => {
    const success = true
    const wrapper = setup({ success })
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })
  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup()
    const guessWordProp = wrapper.instance().props.guessWord
    expect(guessWordProp).toBeInstanceOf(Function)
  })
})

describe('`guessWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  let submit
  let guessWord = 'train'
  beforeEach(() => {
    // 把 mock method 傳入 unconnected component
    guessWordMock = jest.fn();
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock}/>)
    // 利用 setState 來更新 guessWord
    wrapper.setState({ currentGuess: guessWord })
    // 利用 simulate 來仿造一個行為，
    submit = findByTestAttr(wrapper, 'submitButton')
    // 如果 click or submit 有下 e.preventDefault 就可以這樣寫，事件處理的方式
    submit.simulate('click', {
      preventDefault: () => {}
    })
  })
  test('`guessWord` when button is clicked', () => {
    // 以呼叫的次數來測試是否有呼叫
    const guessWordMockCount = guessWordMock.mock.calls.length
    expect(guessWordMockCount).toBe(1)
  })
  test('`guessWord` with input value as args', () => {
    // 來驗証按出 submit 後，guessWord 所帶的 args 是否如預期
    // guessWordMock.mock.calls -> [['']] (第一次呼叫，然後第一次呼叫所帶的 args)
    // 雙陣列裡是 guessWord 帶過來的 args
    const guessWordArgs = guessWordMock.mock.calls[0][0]
    // 所以預期結果應該要跟 setState 是一樣的
    expect(guessWordArgs).toBe(guessWord)
  })
})