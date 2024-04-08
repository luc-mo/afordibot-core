import { NotFoundUserError } from '@afordibot/core'
import { FindUserByIdCommand } from './find-user-by-id-command'
import { FindUserByIdResponse } from './find-user-by-id-response'

export class FindUserById {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ userRepository }) {
		this._userRepository = userRepository
	}

	async execute({ userId }) {
		const user = await this._userRepository.findById(userId)
		this._assertUserExists(user)
		return new FindUserByIdResponse(user.toObject())
	}

	_assertUserExists(user) {
		if (!user) {
			throw new NotFoundUserError('User not found')
		}
	}
}

export { FindUserByIdCommand, FindUserByIdResponse }
