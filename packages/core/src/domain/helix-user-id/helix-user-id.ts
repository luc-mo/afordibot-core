import * as R from 'ramda'
import { InvalidHelixUserIdError } from './errors/invalid-helix-user-id-error'
import { type IHelixUserId } from './types'

export class HelixUserId implements IHelixUserId {
	private readonly _REGEXP = /^[0-9]+$/
	public readonly value: string

	constructor(value: string) {
		this._assertHelixUserId(value)
		this.value = value
	}

	private _assertHelixUserId(value: string) {
		const validator = R.pipe(R.test(this._REGEXP), R.not)
		if (validator(value)) {
			throw new InvalidHelixUserIdError('Property "helixUserId" must be a string of numbers')
		}
	}
}
