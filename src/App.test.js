import React from 'react';
import { shallow } from 'enzyme'
import App, { UnconnectedApp } from './App';
import { storeFactory } from './test/testUtil'

// const setup = (props = {}, state = null) => {
//   const wrapper = shallow(<App {...props}/>)
//   // 如果有帶 state 進來將會加上去
//   if(state){
//     wrapper.setState(state)
//   }
//   return wrapper
// }

// const findByTestAttr = (wrapper, value) => {
//   return wrapper.find(`[data-test="${value}"]`)
// }

// test('renders without error', () => {
//   const wrapper = setup()
//   const appComponent = findByTestAttr(wrapper, 'component-app')
//   expect(appComponent.length).toBe(1)
// });

// test('renders a display counter', () => {
//   const wrapper = setup()
//   const counterDisplay = findByTestAttr(wrapper, 'counter-display')
//   expect(counterDisplay.length).toBe(1)
// })

// test('renders a increment button', () => {
//   const wrapper = setup()
//   const incrementButton = findByTestAttr(wrapper, 'increment-button')
//   expect(incrementButton.length).toBe(1)
// })

// test('counter starts at 0', () => {
//   const wrapper = setup();
//   const initialCounterState = wrapper.state('counter')
//   expect(initialCounterState).toBe(0)
// })

// test('clicking button increments counter display', () => {
//   const counter = 7
//   // 將 state 帶進去
//   const wrapper = setup(null, {counter});
//   // 找到 increment button
//   const incrementButton = findByTestAttr(wrapper, 'increment-button')
//   // 模擬 event
//   incrementButton.simulate('click')
//   // 找到將顯示出來 state 的 node(s)
//   const counterDisplay = findByTestAttr(wrapper, 'counter-display')
//   // 看顯示出來的 state 是否有改變
//   expect(counterDisplay.text()).toContain(counter + 1)
// })

// test('clicking button decrements counter display', () => {
//   const counter = 5;
//   const wrapper = setup(null, { counter })
//   const decrementButton = findByTestAttr(wrapper, 'decrement-button')
//   decrementButton.simulate('click')
//   const counterDisplay = findByTestAttr(wrapper, 'counter-display')
//   expect(counterDisplay.text()).toContain(counter - 1)
// })

// test('error does not show when not needed', () => {
//   const wrapper = setup();
//   const errorMsg = findByTestAttr(wrapper, 'error-message')
//   const errorClass = errorMsg.hasClass('hidden')
//   expect(errorClass).toBe(true)
// })
// // describe 可分類描述各別的 function 測試，會比較清楚在測試哪個 function
// describe('counter is 0 and decrement is clicked', () => {
//   let wrapper;

//   // beforeEach 在測試下面 test 時都會先跑一遍
//   beforeEach(() => {
//     wrapper = setup();

//     const decrementButton = findByTestAttr(wrapper, 'decrement-button')
//     decrementButton.simulate('click')
//   })

//   test('show error', () => {
//     const errorMsg = findByTestAttr(wrapper, 'error-message')
//     // hasClass 是 enzyme API，找 DOM 是否有該 class
//     const errorClass = errorMsg.hasClass('hidden')
//     expect(errorClass).toBe(false)
//   })
//   test('counter still displays 0', () => {
//     const counterDisplay = findByTestAttr(wrapper, 'counter-display')
//     expect(counterDisplay.text()).toContain(0)
//   })

//   test('clicking increment clears the error', () => {
//     // 先模擬點擊 increment
//     const incrementButton = findByTestAttr(wrapper, 'increment-button')
//     incrementButton.simulate('click')

//     // 再看錯誤訊息是否確定有該 class name
//     const errorMsg = findByTestAttr(wrapper, 'error-message')
//     const errorClass = errorMsg.hasClass('hidden')
//     expect(errorClass).toBe(true)
//   })
// })
// 要測試 redux store，所以只能把之前的測試先註解掉
describe('redux properties', () => {
  let setup
  beforeEach(() => {
    setup = (state = {}) => {
      const store = storeFactory(state)
      // 因為使用 shallow，故使用兩次 dive 來往深層的找 node
      // 可以用 wrapper.debug() 來看目前在哪個 node 
      const wrapper = shallow(<App store={store}/>).dive().dive()
      return wrapper
    }
  })
  // 測試一開始的 App 從 redux store 傳過來的 properties
  test('has access to `success` state', () => {
    const success = true
    const wrapper = setup({ success })
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })
  test('has access to `secretWord` state', () => {
    const secretWord = 'party'
    const wrapper = setup({ secretWord })
    const secretWordProp = wrapper.instance().props.secretWord
    expect(secretWordProp).toBe(secretWord)
  })
  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }]
    const wrapper = setup({ guessedWords })
    const guessedWordsProp = wrapper.instance().props.guessedWords
    expect(guessedWordsProp).toEqual(guessedWords)
  })
  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup()
    const getSecretWordProp = wrapper.instance().props.getSecretWord
    expect(getSecretWordProp).toBeInstanceOf(Function)
  })
  test('`getSecretWord` runs on App mount', () => {
    // jest.fn() 用來提供當作是 mock function，這裡是表示是 getSecretWord action creator，透過 props 傳入 App
    const getSecretWordMock = jest.fn();
    // 由於還有從 redux store 來的 props，所以也要傳入 mock props
    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: [] 
    }
    // 這裡不使用 setup 來創造 wrapper，因為 setup 是有連結到 redux
    // 這邊直接創一個 shallow UnconnectedApp
    const wrapper = shallow(<UnconnectedApp {...props}/>)
    // 運行 componentDidMount
    wrapper.instance().componentDidMount()
    // 來測試呼叫次數
    const getSecretWordMockCount = getSecretWordMock.mock.calls.length
    expect(getSecretWordMockCount).toBe(1)
  })
})
