import { getValue } from '@/shared/functions'
import { User, UserCreatedEvent, AlreadyExistsUserError } from '@afordibot/core'
import { JoinChannelCommand } from './join-channel-command'
import { JoinChannelResponse } from './join-channel-response'

export class JoinChannel {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ idGenerator, amqpClient, restHelixClient, userRepository }) {
		this._idGenerator = idGenerator
		this._amqpClient = amqpClient
		this._restHelixClient = restHelixClient
		this._userRepository = userRepository
	}

	async execute({ helixId, helixToken }) {
		const helixUser = await this._restHelixClient.getUserById(helixId, helixToken)
		const exists = await this._userRepository.findByHelixId(helixUser.id)
		this._assertUserExists(exists)

		const id = exists ? getValue(exists.id) : this._idGenerator.generate()
		const user = new User({
			id,
			helixId: helixUser.id,
			username: helixUser.username,
			displayName: helixUser.displayName,
			imageUrl: helixUser.profileImageUrl,
			enabled: true,
		})
		await this._userRepository.save(user)
		await this._amqpClient.publish(this._createUserCreatedEvent(user))
		return new JoinChannelResponse(user.toObject())
	}

	_createUserCreatedEvent(user) {
		return new UserCreatedEvent(user, {
			id: this._idGenerator.generate(),
			type: 'user.user_created',
			source: 'core-api',
			version: 1,
			timestamp: Date.now(),
		})
	}

	_assertUserExists(user) {
		if (user && user.enabled) {
			throw new AlreadyExistsUserError('User already exists')
		}
	}
}

export { JoinChannelCommand, JoinChannelResponse }
