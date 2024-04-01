import * as R from 'ramda'
import { getValue } from '@/shared/functions'
import {
	Command,
	NotFoundUserError,
	AlreadyExistsCommandError,
	InsufficientPermissionsError,
} from '@afordibot/core'
import { CreateCommandCommand } from './create-command-command'
import { CreateCommandResponse } from './create-command-response'

export class CreateCommand {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ idGenerator, userRepository, commandRepository }) {
		this._idGenerator = idGenerator
		this._userRepository = userRepository
		this._commandRepository = commandRepository
	}

	async execute({ helixUserId, name, message, value, permission, timeout, viewerPermissions }) {
		this._assertViewerPermissions(viewerPermissions)

		const user = await this._userRepository.findByHelixId(helixUserId)
		this._assertUserExists(user)

		const id = this._idGenerator.generate()
		const existsCommand = await this._commandRepository.findByIdOrName({ id, name })
		this._assertCommandDoesNotExists(existsCommand)

		const date = Date.now()
		const command = new Command({
			id,
			userId: getValue(user.id),
			helixUserId: getValue(user.helixId),
			names: [name],
			messages: [message],
			values: R.isNotNil(value) ? [value] : [],
			permission,
			timeout,
			enabled: true,
			createdAt: date,
			updatedAt: date,
			createdBy: getValue(user.helixId),
			updatedBy: getValue(user.helixId),
		})

		await this._commandRepository.save(command)
		return new CreateCommandResponse(command)
	}

	_assertUserExists(user) {
		if (!user) {
			throw new NotFoundUserError('User not found')
		}
	}

	_assertCommandDoesNotExists(command) {
		if (command) {
			throw new AlreadyExistsCommandError('Command already exists')
		}
	}

	_assertViewerPermissions(viewerPermissions) {
		if (!viewerPermissions.isModerator()) {
			throw new InsufficientPermissionsError('Insufficient permissions to create commands')
		}
	}
}

export { CreateCommandCommand }
