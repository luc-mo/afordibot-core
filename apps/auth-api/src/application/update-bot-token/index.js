import { Authorization, InvalidAuthorizationError } from '@afordibot/core'
import { getValue } from '@/shared/functions'
import { UpdateBotTokenCommand } from './update-bot-token-command'

export class UpdateBotToken {
	constructor({ config, idGenerator, restHelixClient, authorizationRepository }) {
		this._config = config
		this._idGenerator = idGenerator
		this._restHelixClient = restHelixClient
		this._authorizationRepository = authorizationRepository
	}

	async execute({ code }) {
		const tokenData = await this._restHelixClient.getBotAccessToken(code)
		const userData = await this._restHelixClient.getUserData(tokenData.accessToken)
		this._assertUserId(userData.id)

		const authExist = await this._authorizationRepository.findByHelixUserId(userData.id)
		const authorization = new Authorization({
			id: authExist ? getValue(authExist.id) : this._idGenerator.generate(),
			helixUserId: userData.id,
			accessToken: tokenData.accessToken,
			refreshToken: tokenData.refreshToken,
			expiresIn: tokenData.expiresIn,
			scope: tokenData.scope,
		})
		await this._authorizationRepository.save(authorization)
	}

	_assertUserId(userId) {
		const { botId } = this._config.helix
		if (userId !== botId) {
			throw new InvalidAuthorizationError('Authenticated user is not the configured bot')
		}
	}
}

export { UpdateBotTokenCommand }
