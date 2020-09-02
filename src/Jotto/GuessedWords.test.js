import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtil'

import GuessedWords from './GuessedWords'

const defaultProps = {
  guessedWords: [{
    guessedWord: 'lucky',
    letterMatchCount: 4
  }]
}

const setup = (props = {}) => {
  const setupProps = {...defaultProps, ...props};
  return shallow(<GuessedWords {...setupProps}/>)
}

test('does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps)
})
// 有描述在看測試結果會比較一目了然，可以把相關測試放在一起
describe('if there are no words guessed', () => {
  let wrapper;
  // 在每次測試前都會跑一次的 enzyme API
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessedWords')
    expect(component.length).toBe(1)
  })
  test('renders instructions to guess a word', () => {
    const instruction = findByTestAttr(wrapper, 'component-instructions')
    // 因為可能會猜很多次，所以長度不該為 0
    expect(instruction.text().length).not.toBe(0)
  })
})
describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: 'Nick', letterMatchCount: 3 },
    { guessedWord: 'Tony', letterMatchCount: 2 },
    { guessedWord: 'Nic', letterMatchCount: 1 },
  ]
  beforeEach(() => {
    wrapper = setup({ guessedWords })
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessedWords')
    expect(component.length).toBe(1)
  })
  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessedWords')
    expect(guessedWordsNode.length).toBe(1)
  })
  test('correct number of guessed words', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessedWord')
    // 比對模擬出來的 guessedWords 長度
    expect(guessedWordNodes.length).toBe(guessedWords.length)
  })
})