import * as R from 'ramda'
import { FindBotUsernamesResponse } from './find-bot-usernames-response'

export class FindBotUsernames {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ userRepository }) {
		this._userRepository = userRepository
	}

	async execute() {
		const users = await this._userRepository.findAll()
		const usernames = R.pluck('username', users)
		return new FindBotUsernamesResponse(usernames)
	}
}

export { FindBotUsernamesResponse }
