import { getValue } from '@/shared/functions'
import { NotFoundCommandError, TimeoutCommandError } from '@afordibot/core'
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

		const commandId = getValue(command.id)
		const count = await this._realtimeCommandRepository.findCountByCommandId(commandId)

		const message = await command.pickRandomMessage({
			user: username,
			sender,
			receiver,
			count: count + 1,
		})

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
}

export { UseCommandCommand, UseCommandResponse }
