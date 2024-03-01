import * as R from 'ramda'
import { validate, between } from '@/shared/functions'
import { InvalidCommandError } from './errors/invalid-command-error'
import type { IMessage } from './types'

export class Message implements IMessage {
	public readonly value: string

	constructor(value: string) {
		this._assertMessage(value)
		this.value = value
	}

	static create(value: string) {
		return new Message(value)
	}

	_assertMessage(value: string) {
		const hasLength = R.pipe(R.length, between(1, 500))
		const validator = R.pipe(validate(R.is(String), hasLength), R.not)
		if (validator(value)) {
			throw new InvalidCommandError(
				'Property "messages" must be an array of non-empty strings with length between 1 and 500 characters'
			)
		}
	}
}
