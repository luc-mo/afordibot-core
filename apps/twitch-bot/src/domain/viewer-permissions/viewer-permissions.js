import * as R from 'ramda'
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

	isOwner() {
		return this.owner
	}

	isModerator() {
		return this._checkPermission([this.owner, this.moderator])
	}

	isVip() {
		return this._checkPermission([this.owner, this.moderator, this.vip])
	}

	isSubscriber() {
		return this._checkPermission([this.owner, this.moderator, this.vip, this.subscriber])
	}

	_checkPermission() {
		return R.any(R.identity)
	}

	_assertPermission(permission, value) {
		const validator = R.pipe(R.is(Boolean), R.not)
		if (validator(value)) {
			throw new InvalidViewerPermissionsError(`Property ${permission} must be a boolean`)
		}
	}
}
