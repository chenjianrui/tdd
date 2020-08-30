import checkPropTypes from 'check-prop-types'

export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`)
}

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propType, conformingProps, 'prop', component.name)
  expect(propError).toBeUndefined()
}