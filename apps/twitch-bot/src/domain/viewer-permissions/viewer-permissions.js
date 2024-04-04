import * as R from 'ramda'
import { anyValue } from '@/shared/functions'
import { InvalidViewerPermissionsError } from './errors/invalid-viewer-permissions-error'

export class ViewerPermissions {
	constructor({ owner, moderator, vip, subscriber, everyone }) {
		this._assertPermission('owner', owner)
		this._assertPermission('moderator', moderator)
		this._assertPermission('vip', vip)
		this._assertPermission('subscriber', subscriber)
		this._assertPermission('everyone', everyone)
		this.owner = owner
		this.moderator = moderator
		this.vip = vip
		this.subscriber = subscriber
		this.everyone = everyone
	}

	getPermission() {
		const permissions = Object.keys(this)
		for (const permission of permissions) {
			if (this[permission]) return permission
		}
		return 'everyone'
	}

	hasPermission(permission) {
		const permissions = {
			owner: this.isOwner(),
			moderator: this.isModerator(),
			vip: this.isVip(),
			subscriber: this.isSubscriber(),
			everyone: this.everyone,
		}
		return permissions[permission]
	}

	isOwner() {
		return this.owner
	}

	isModerator() {
		return anyValue([this.owner, this.moderator])
	}

	isVip() {
		return anyValue([this.owner, this.moderator, this.vip])
	}

	isSubscriber() {
		return anyValue([this.owner, this.moderator, this.vip, this.subscriber])
	}

	_assertPermission(permission, value) {
		const validator = R.pipe(R.is(Boolean), R.not)
		if (validator(value)) {
			throw new InvalidViewerPermissionsError(`Property ${permission} must be a boolean`)
		}
	}
}
