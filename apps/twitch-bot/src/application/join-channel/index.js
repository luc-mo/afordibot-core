import { getValue } from '@/shared/functions'
import { User, AlreadyExistsUserError } from '@afordibot/core'
import { JoinChannelCommand } from './join-channel-command'
import { JoinChannelResponse } from './join-channel-response'

export class JoinChannel {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ idGenerator, restHelixClient, userRepository }) {
		this._idGenerator = idGenerator
		this._restHelixClient = restHelixClient
		this._userRepository = userRepository
	}

	async execute({ helixId }) {
		const helixUser = await this._restHelixClient.getUserById(helixId)
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
		return new JoinChannelResponse(user)
	}

	_assertUserExists(user) {
		if (user) {
			throw new AlreadyExistsUserError('User already exists')
		}
	}
}

export { JoinChannelCommand, JoinChannelResponse }
