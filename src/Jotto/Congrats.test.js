import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import { findByTestAttr, checkProps } from '../test/testUtil'
import Congrats from './Congrats'

const defaultProps = { success: false }

const setup = (props = {}) => {
  // 寫個 default props，讓測試時更方便一點
  const setupProps = {...defaultProps, ...props}
  const wrapper = shallow(<Congrats {...setupProps}/>)
  return wrapper
}

Enzyme.configure({adapter: new EnzymeAdapter()})

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
})
test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('')
})
test('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true })
  const message = findByTestAttr(wrapper, 'congrats-message')
  expect(message.text().length).not.toBe(0)
})
test('does not throw warning with expected props', () => {
  const expectedProps = { success: false }
  // 檢查 prop 型態是否如預期，但感覺不需要測試，因為 App 裡的 prop-types 裡已經會測試了
  checkProps(Congrats, expectedProps)
})