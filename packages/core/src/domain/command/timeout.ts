import * as R from 'ramda'
import { between, validate } from '@/shared/functions'
import { InvalidCommandError } from './errors/invalid-command-error'
import type { ITimeout } from './types'

export class Timeout implements ITimeout {
	public readonly value: number

	constructor(value: number) {
		this._assertTimeout(value)
		this.value = value
	}

	private _assertTimeout(value: number) {
		const validator = R.pipe(validate(Number.isInteger, between(0, 3600)), R.not)
		if (validator(value)) {
			throw new InvalidCommandError(
				'Property "timeout" must be a number between 0 and 3600 seconds'
			)
		}
	}
}
