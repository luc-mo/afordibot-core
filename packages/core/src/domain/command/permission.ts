import * as R from 'ramda'
import { InvalidCommandError } from './errors/invalid-command-error'
import type { IPermission } from './types'

export class Permission implements IPermission {
	private readonly _VALID_PERMISSIONS = ['owner', 'moderator', 'vip', 'subscriber', 'everyone']
	public readonly value: string

	constructor(value: string) {
		this._assertPermission(value)
		this.value = value
	}

	private _assertPermission(value: string) {
		const validator = R.pipe(R.includes(R.__, this._VALID_PERMISSIONS), R.not)
		if (validator(value)) {
			const formatter = new Intl.ListFormat('en', { style: 'long', type: 'disjunction' })
			const permissions = formatter.format(this._VALID_PERMISSIONS)
			throw new InvalidCommandError(`Property "permission" must be ${permissions}`)
		}
	}
}
