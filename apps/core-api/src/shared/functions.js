import * as R from 'ramda'

export const getValue = R.prop('value')

export const hasProperties = R.curry((properties, obj) => properties.every(R.has(R.__, obj)))
