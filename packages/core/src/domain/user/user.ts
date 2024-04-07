import * as R from 'ramda'
import { getValue, validate, between } from '@/shared/functions'
import { UUID } from '@/domain/uuid'
import { HelixUserId } from '@/domain/helix-user-id'
import { InvalidUserError } from './errors/invalid-user-error'
import type { IUser } from './types'

export class User implements IUser {
	private readonly _IMAGE_URL_REGEXP =
		/^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?].*)?$/i
	private readonly _id: UUID
	private readonly _helixId: HelixUserId
	private readonly _username: string
	private readonly _displayName: string
	private readonly _imageUrl: string
	private readonly _enabled: boolean

	constructor({ id, helixId, username, displayName, imageUrl, enabled }: Constructor) {
		this._assertUsername(username)
		this._assertImageUrl(imageUrl)
		this._assertEnabled(enabled)
		this._id = new UUID(id)
		this._helixId = new HelixUserId(helixId)
		this._username = username
		this._displayName = displayName
		this._imageUrl = imageUrl
		this._enabled = enabled
	}

	public toObject() {
		return {
			id: getValue(this._id),
			helixId: getValue(this._helixId),
			username: this._username,
			displayName: this._displayName,
			imageUrl: this._imageUrl,
			enabled: this._enabled,
		}
	}

	private _assertUsername(value: string) {
		const hasLength = R.pipe(R.length, between(4, 25))
		const validator = R.pipe(validate(R.is(String), hasLength), R.not)
		if (validator(value)) {
			throw new InvalidUserError('Property "username" must be a string between 4 and 25 characters')
		}
	}

	private _assertImageUrl(value: string) {
		const validator = R.pipe(R.test(this._IMAGE_URL_REGEXP), R.not)
		if (validator(value)) {
			throw new InvalidUserError('Property "imageUrl" must be a valid url')
		}
	}

	private _assertEnabled(value: boolean) {
		const validator = R.pipe(R.is(Boolean), R.not)
		if (validator(value)) {
			throw new InvalidUserError('Property "enabled" must be a boolean value')
		}
	}

	get id() {
		return this._id
	}

	get helixId() {
		return this._helixId
	}

	get username() {
		return this._username
	}

	get displayName() {
		return this._displayName
	}

	get imageUrl() {
		return this._imageUrl
	}

	get enabled() {
		return this._enabled
	}
}

interface Constructor {
	id: string
	helixId: string
	username: string
	displayName: string
	imageUrl: string
	enabled: boolean
}
