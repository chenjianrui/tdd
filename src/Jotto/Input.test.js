import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../test/testUtil'
import Input from './Input'

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
describe('update state', () => {

})