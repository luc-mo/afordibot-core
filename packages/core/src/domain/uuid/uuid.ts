import * as R from 'ramda'
import { validate } from 'uuid'

import { InvalidUUIDError } from './errors/invalid-uuid-error'
import { type IUUID } from './types'

export class UUID implements IUUID {
	public readonly value: string

	constructor(value: string) {
		this._assertUUID(value)
		this.value = value
	}

	private _assertUUID(value: string) {
		const validator = R.pipe(R.and(R.is(String), validate), R.not)
		if (validator(value)) {
			throw new InvalidUUIDError('Invalid UUID')
		}
	}
}
