import React from 'react'
import Enzyme, { Shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import { findByTestAttr } from '../test/testUtil'
import Congrats from './Congrats'

const setup = (props = {}) => {
  const wrapper = shallow(<Congrats {...props}/>)
  return wrapper
}

Enzyme.configure({adapter: new EnzymeAdapter()})

test('renders without error', () => {

})
test('renders no text when `success` prop is false', () => {

})
test('renders non-empty congrats message when `success` prop is true', () => {

})