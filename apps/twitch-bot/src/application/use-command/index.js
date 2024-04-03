import { getValue } from '@/shared/functions'
import { NotFoundCommandError } from '@afordibot/core'
import { UseCommandCommand } from './use-command-command'
import { UseCommandResponse } from './use-command-response'

export class UseCommand {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ commandRepository, realtimeCommandRepository }) {
		this._commandRepository = commandRepository
		this._realtimeCommandRepository = realtimeCommandRepository
	}

	async execute({ name, helixUserId, username, sender, receiver, viewerPermissions }) {
		const command = await this._commandRepository.findByHelixUserIdAndName({ helixUserId, name })
		this._assertCommandExists(command)

		const commandId = getValue(command.id)
		const count = await this._realtimeCommandRepository.findCountByCommandId(commandId)

		const message = await command.pickRandomMessage({
			user: username,
			sender,
			receiver,
			count,
		})

		await this._realtimeCommandRepository.incrementCountByCommandId(commandId)
		return new UseCommandResponse(message)
	}

	_assertCommandExists(command) {
		if (!command) {
			throw new NotFoundCommandError('Command not found')
		}
	}
}

export { UseCommandCommand, UseCommandResponse }
