import * as R from 'ramda'
import { validate, between } from '@/shared/functions'
import { InvalidCommandError } from './errors/invalid-command-error'
import type { IValue } from './types'

export class Value implements IValue {
	public readonly value: string

	constructor(value: string) {
		this._assertValue(value)
		this.value = value
	}

	static create(value: string) {
		return new Value(value)
	}

	_assertValue(value: string) {
		const hasLength = R.pipe(R.length, between(1, 25))
		const validator = R.pipe(validate(R.is(String), hasLength), R.not)
		if (validator(value)) {
			throw new InvalidCommandError(
				'Property "values" must be an array of non-empty strings with length between 1 and 25 characters'
			)
		}
	}
}
