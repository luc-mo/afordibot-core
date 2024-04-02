import * as R from 'ramda'
import { validate } from '@/shared/functions'
import { InvalidTimestampError } from './errors/invalid-timestamp-error'
import type { ITimestamp } from './types'

export class Timestamp implements ITimestamp {
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor(createdAt: number, updatedAt: number) {
		this._assertTimestamp(createdAt, 'createdAt')
		this._assertTimestamp(updatedAt, 'updatedAt')
		this._assertTemporalOrder(createdAt, updatedAt)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	private _assertTimestamp(value: number, name: 'createdAt' | 'updatedAt') {
		const validator = R.pipe(validate(R.lt(0), Number.isInteger, Number.isFinite), R.not)
		if (validator(value)) {
			throw new InvalidTimestampError(`Timestamp "${name}" must be a positive integer`)
		}
	}

	private _assertTemporalOrder(createdAt: number, updatedAt: number) {
		if (createdAt > updatedAt) {
			throw new InvalidTimestampError(`Timestamp "updatedAt" must be greater than "createdAt"`)
		}
	}
}
