import { RefreshingAuthProvider } from '@twurple/auth'
import { Authorization } from '@afordibot/core'
import { getValue } from '@/shared/functions'

export class AuthProvider {
	_INTENTS = ['chat']
	_authProvider = null
	_instance = null

	constructor({ config, authorizationRepository }) {
		this._config = config
		this._authorizationRepository = authorizationRepository
	}

	async _connect() {
		const { botId, clientId, clientSecret } = this._config.bot
		const authorization = await this._authorizationRepository.findByHelixUserId(botId)
		this._authProvider = new RefreshingAuthProvider({ clientId, clientSecret })
		this._authProvider.onRefresh(this._onRefresh(authorization).bind(this))
		this._authProvider.addUser(botId, this._createTokenData(authorization), this._INTENTS)
		return this._authProvider
	}

	async getInstance() {
		if (!this._instance) {
			this._instance = await this._connect()
		}
		this._instance.getAnyAccessToken()
		return this._instance
	}

	async getBotToken() {
		const instance = await this.getInstance()
		const data = await instance.getAnyAccessToken(this._config.bot.botId)
		return data.accessToken
	}

	_onRefresh(exist) {
		return async (_, tokenData) => {
			const authorization = new Authorization({
				id: getValue(exist.id),
				helixUserId: getValue(exist.helixUserId),
				accessToken: tokenData.accessToken,
				refreshToken: tokenData.refreshToken,
				expiresIn: tokenData.expiresIn,
				scope: tokenData.scope,
			})
			await this._authorizationRepository.save(authorization)
		}
	}

	_createTokenData(authorization) {
		return {
			accessToken: authorization.accessToken,
			refreshToken: authorization.refreshToken,
			expiresIn: authorization.expiresIn,
			obtainmentTimestamp: 0,
		}
	}
}
