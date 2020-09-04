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
    test('renders component without error', () => {

    })
    test('renders input box', () => {

    })
    test('renders submit button', () => {
      
    })
  })
  describe('word has been guessed', () => {
    test('renders component without error', () => {

    })
    test('does not render input box', () => {

    })
    test('does not render submit button', () => {

    })
  })
})
describe('update state', () => {

})