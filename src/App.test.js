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
  // 找到將顯示出來 state 的 node(s)
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  // 看顯示出來的 state 是否有改變
  expect(counterDisplay.text()).toContain(counter + 1)
})

test('clicking button decrements counter display', () => {
  const counter = 5;
  const wrapper = setup(null, { counter })
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter - 1)
})

test('error does not show when not needed', () => {
  const wrapper = setup();
  const errorMsg = findByTestAttr(wrapper, 'error-message')
  const errorClass = errorMsg.hasClass('hidden')
  expect(errorClass).toBe(true)
})
// describe 可分類描述各別的 function 測試，會比較清楚在測試哪個 function
describe('counter is 0 and decrement is clicked', () => {
  let wrapper;

  // beforeEach 在測試下面 test 時都會先跑一遍
  beforeEach(() => {
    wrapper = setup();

    const decrementButton = findByTestAttr(wrapper, 'decrement-button')
    decrementButton.simulate('click')
  })

  test('show error', () => {
    const errorMsg = findByTestAttr(wrapper, 'error-message')
    // hasClass 是 enzyme API，找 DOM 是否有該 class
    const errorClass = errorMsg.hasClass('hidden')
    expect(errorClass).toBe(false)
  })
  test('counter still displays 0', () => {
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(0)
  })

  test('clicking increment clears the error', () => {
    // 先模擬點擊 increment
    const incrementButton = findByTestAttr(wrapper, 'increment-button')
    incrementButton.simulate('click')

    // 再看錯誤訊息是否確定有該 class name
    const errorMsg = findByTestAttr(wrapper, 'error-message')
    const errorClass = errorMsg.hasClass('hidden')
    expect(errorClass).toBe(true)
  })
})