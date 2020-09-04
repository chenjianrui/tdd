import checkPropTypes from 'check-prop-types'
import { createStore, applyMiddleware } from 'redux'

import { middlewares } from '../configureStore'
import rootReducers from '../reducers/index'

// create a store factory for test
export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddleware(rootReducers, initialState)
}

export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`)
}

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name)
  expect(propError).toBeUndefined()
}