import * as R from 'ramda'
import { pickRandomItem } from '@/shared/functions'

import { UUID } from '@/domain/uuid'
import { HelixUserId } from '@/domain/helix-user-id'
import { Timestamp } from '@/domain/timestamp'

import { Name } from './name'
import { Message } from './message'
import { Value } from './value'
import { Permission } from './permission'
import { Timeout } from './timeout'
import { InvalidCommandError } from './errors/invalid-command-error'
import type { ICommand } from './types'

export class Command implements ICommand {
	private readonly _id: UUID
	private readonly _userId: UUID
	private readonly _helixUserId: HelixUserId
	private readonly _names: Name[]
	private readonly _messages: Message[]
	private readonly _values: Value[]
	private readonly _permission: Permission
	private readonly _timeout: Timeout
	private readonly _enabled: boolean
	private readonly _timestamp: Timestamp
	private readonly _createdBy: HelixUserId
	private readonly _updatedBy: HelixUserId

	constructor({
		id,
		userId,
		helixUserId,
		names,
		messages,
		values,
		permission,
		timeout,
		enabled,
		createdAt,
		updatedAt,
		createdBy,
		updatedBy,
	}: Constructor) {
		this._assertNameArray(names)
		this._assertMessageArray(messages)
		this._assertValueArray(values)
		this._assertEnabled(enabled)
		this._id = new UUID(id)
		this._userId = new UUID(userId)
		this._helixUserId = new HelixUserId(helixUserId)
		this._names = R.uniq(names).map(Name.create)
		this._messages = R.uniq(messages).map(Message.create)
		this._values = R.uniq(values).map(Value.create)
		this._permission = new Permission(permission)
		this._timeout = new Timeout(timeout)
		this._enabled = enabled
		this._timestamp = new Timestamp(createdAt, updatedAt)
		this._createdBy = new HelixUserId(createdBy)
		this._updatedBy = new HelixUserId(updatedBy)
	}

	private _assertNameArray(value: string[]) {
		const validator = R.pipe(R.is(Array), R.not)
		if (validator(value)) {
			throw new InvalidCommandError(
				'Property "names" must be an array of non-empty strings with length between 1 and 25 characters'
			)
		}

		if (R.isEmpty(value)) {
			throw new InvalidCommandError('Property "names" must be an array with at least one item')
		}
	}

	private _assertMessageArray(value: string[]) {
		const validator = R.pipe(R.is(Array), R.not)
		if (validator(value)) {
			throw new InvalidCommandError(
				'Property "messages" must be an array of non-empty strings with length between 1 and 500 characters'
			)
		}

		if (R.isEmpty(value)) {
			throw new InvalidCommandError('Property "messages" must be an array with at least one item')
		}
	}

	private _assertValueArray(value: string[]) {
		const validator = R.pipe(R.is(Array), R.not)
		if (validator(value)) {
			throw new InvalidCommandError(
				'Property "values" must be an array of non-empty strings with length between 1 and 25 characters'
			)
		}
	}

	private _assertEnabled(value: boolean) {
		const validator = R.pipe(R.is(Boolean), R.not)
		if (validator(value)) {
			throw new InvalidCommandError('Property "enabled" must be a boolean')
		}
	}

	get id() {
		return this._id
	}

	get userId() {
		return this._userId
	}

	get helixUserId() {
		return this._helixUserId
	}

	get names() {
		return this._names
	}
	get messages() {
		return this._messages
	}

	get values() {
		return this._values
	}

	get permission() {
		return this._permission
	}

	get timeout() {
		return this._timeout
	}

	get enabled() {
		return this._enabled
	}

	get timestamp() {
		return this._timestamp
	}

	get createdBy() {
		return this._createdBy
	}

	get updatedBy() {
		return this._updatedBy
	}
}

interface Constructor {
	id: string
	userId: string
	helixUserId: string
	names: string[]
	messages: string[]
	values: string[]
	permission: string
	timeout: string
	enabled: boolean
	createdAt: number
	updatedAt: number
	createdBy: string
	updatedBy: string
}
