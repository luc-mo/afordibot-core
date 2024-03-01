import * as R from 'ramda'
import { validate } from '@/shared/functions'
import { UUID } from '@/domain/uuid'
import { HelixUserId } from '@/domain/helix-user-id'
import { InvalidAuthorizationError } from './errors/invalid-authorization-error'
import type { IAuthorization } from './types'

export class Authorization implements IAuthorization {
	private readonly _id: UUID
	private readonly _helixUserId: HelixUserId
	private readonly _accessToken: string
	private readonly _refreshToken: string
	private readonly _expiresIn: number
	private readonly _scope: string[]

	constructor({ id, helixUserId, accessToken, refreshToken, expiresIn, scope }: Constructor) {
		this._assertField('accessToken', accessToken)
		this._assertField('refreshToken', refreshToken)
		this._assertExpiresIn(expiresIn)
		this._assertScope(scope)
		this._id = new UUID(id)
		this._helixUserId = new HelixUserId(helixUserId)
		this._accessToken = accessToken
		this._refreshToken = refreshToken
		this._expiresIn = expiresIn
		this._scope = R.uniq(scope)
	}

	_assertField(field: 'accessToken' | 'refreshToken', value: string) {
		const validator = R.pipe(R.is(String), R.not)
		if (validator(value)) {
			throw new InvalidAuthorizationError(`Property ${field} should be a string`)
		}
	}

	_assertExpiresIn(value: number) {
		const validator = R.pipe(R.is(Number), R.not)
		if (validator(value)) {
			throw new InvalidAuthorizationError('Property "expiresIn" should be a number')
		}
	}

	_assertScope(value: string[]) {
		const validator = R.pipe(validate(R.is(Array), R.all(R.is(String))), R.not)
		if (validator(value)) {
			throw new InvalidAuthorizationError('Property "scope" should be a string array')
		}
	}

	get id() {
		return this._id
	}

	get helixUserId() {
		return this._helixUserId
	}

	get accessToken() {
		return this._accessToken
	}

	get refreshToken() {
		return this._refreshToken
	}

	get expiresIn() {
		return this._expiresIn
	}

	get scope() {
		return this._scope
	}
}

interface Constructor {
	id: string
	helixUserId: string
	accessToken: string
	refreshToken: string
	expiresIn: number
	scope: string[]
}
