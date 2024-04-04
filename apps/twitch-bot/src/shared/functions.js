import * as R from 'ramda'

export const getValue = R.prop('value')

export const anyValue = R.any(R.identity)
