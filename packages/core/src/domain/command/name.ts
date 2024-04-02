import * as R from 'ramda'
import { validate, between } from '@/shared/functions'
import { InvalidCommandError } from './errors/invalid-command-error'
import type { IName } from './types'

export class Name implements IName {
	public readonly value: string

	constructor(value: string) {
		this._assertName(value)
		this.value = value
	}

	static create(value: string) {
		return new Name(value)
	}

	private _assertName(value: string) {
		const hasLength = R.pipe(R.length, between(1, 25))
		const validator = R.pipe(validate(R.is(String), hasLength), R.not)
		if (validator(value)) {
			throw new InvalidCommandError(
				'Property "names" must be an array of non-empty strings with length between 1 and 25 characters'
			)
		}
	}
}
