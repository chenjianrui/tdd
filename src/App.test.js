import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props}/>)
  // 如果有帶 state 進來將會加上去
  if(state){
    wrapper.setState(state)
  }
  return wrapper
}

const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`)
}

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
});

test('renders a display counter', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('renders a increment button', () => {
  const wrapper = setup()
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  expect(incrementButton.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

test('clicking button increments counter display', () => {
  const counter = 7
  // 將 state 帶進去
  const wrapper = setup(null, {counter});
  // 找到 increment button
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  // 模擬 event
  incrementButton.simulate('click')
  // 找到將顯示出來的 state
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  // 看顯示出來的 state 是否有改變
  expect(counterDisplay.text()).toContain(counter + 1)
})