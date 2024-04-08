import { getValue } from '@/shared/functions'
import { User, UserDisabledEvent, NotFoundUserError } from '@afordibot/core'
import { LeaveChannelCommand } from './leave-channel-command'

export class LeaveChannel {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ idGenerator, amqpClient, userRepository }) {
		this._idGenerator = idGenerator
		this._amqpClient = amqpClient
		this._userRepository = userRepository
	}

	async execute({ helixId }) {
		const exists = await this._userRepository.findByHelixId(helixId)
		this._assertUserExists(exists)

		const user = new User({
			id: getValue(exists.id),
			helixId: getValue(exists.helixId),
			username: exists.username,
			displayName: exists.displayName,
			imageUrl: exists.imageUrl,
			enabled: false,
		})

		await this._userRepository.save(user)
		await this._amqpClient.publish(this._createUserDisabledEvent(getValue(user.id)))
	}

	_createUserDisabledEvent(userId) {
		return new UserDisabledEvent(userId, {
			id: this._idGenerator.generate(),
			type: 'user.user_disabled',
			source: 'core-api',
			version: 1,
			timestamp: Date.now(),
		})
	}

	_assertUserExists(user) {
		if (!user) {
			throw new NotFoundUserError('User not found')
		}
	}
}

export { LeaveChannelCommand }
