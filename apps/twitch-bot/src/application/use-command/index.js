import { getValue } from '@/shared/functions'
import {
	InsufficientPermissionsError,
	NotFoundCommandError,
	TimeoutCommandError,
	NotFoundValidCommandMessageError,
} from '@afordibot/core'
import { UseCommandCommand } from './use-command-command'
import { UseCommandResponse } from './use-command-response'

export class UseCommand {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ commandTimeoutHandler, commandRepository, realtimeCommandRepository }) {
		this._commandTimeoutHandler = commandTimeoutHandler
		this._commandRepository = commandRepository
		this._realtimeCommandRepository = realtimeCommandRepository
	}

	async execute({ name, helixUserId, username, sender, receiver, viewerPermissions }) {
		const command = await this._commandRepository.findByHelixUserIdAndName({ helixUserId, name })
		this._assertCommandExists(command)
		this._assertCommandTimeout(command)
		this._assertViewerPermissions(command, viewerPermissions)

		const commandId = getValue(command.id)
		const count = await this._realtimeCommandRepository.findCountByCommandId(commandId)

		const message = await command.pickRandomMessage({
			user: username,
			sender,
			receiver,
			count: count + 1,
		})
		this._assertMessageExists(message)

		await this._realtimeCommandRepository.incrementCountByCommandId(commandId)
		this._commandTimeoutHandler.add(command)
		return new UseCommandResponse(message)
	}

	_assertCommandExists(command) {
		if (!command) {
			throw new NotFoundCommandError('Command not found')
		}
	}

	_assertCommandTimeout(command) {
		const exists = this._commandTimeoutHandler.exists(getValue(command.id))
		if (exists) {
			throw new TimeoutCommandError('Command is in timeout')
		}
	}

	_assertViewerPermissions(command, viewerPermissions) {
		const permission = getValue(command.permission)
		const hasPermission = viewerPermissions.hasPermission(permission)
		if (!hasPermission) {
			throw new InsufficientPermissionsError(
				`Insufficient permissions to use this command, expected ${permission}`
			)
		}
	}

	_assertMessageExists(message) {
		if (!message) {
			throw new NotFoundValidCommandMessageError('Valid command message not found')
		}
	}
}

export { UseCommandCommand, UseCommandResponse }
