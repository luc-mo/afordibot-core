import { getValue } from '@/shared/functions'
import { User, NotFoundUserError } from '@afordibot/core'
import { LeaveChannelCommand } from './leave-channel-command'

export class LeaveChannel {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ userRepository }) {
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
	}

	_assertUserExists(user) {
		if (!user) {
			throw new NotFoundUserError('User not found')
		}
	}
}

export { LeaveChannelCommand }
