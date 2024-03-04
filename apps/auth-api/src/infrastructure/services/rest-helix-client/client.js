import { InvalidAuthorizationError } from '@afordibot/core'
import { URLBuilder } from '@/shared/url-builder'
import { HttpError } from '@/domain/errors'

export class RestHelixClient {
	constructor({ config, httpClient, restHelixRequestParser }) {
		this._config = config
		this._httpClient = httpClient
		this._restHelixRequestParser = restHelixRequestParser
	}

	async getBotAccessToken(code) {
		try {
			const { clientId, clientSecret } = this._config.helix
			const redirectUri = `${this._config.server.domainUrl}/api/v1/auth/bot/token`
			const url = new URLBuilder('https://id.twitch.tv/oauth2/token')
				.addSearchParam('code', code)
				.addSearchParam('client_id', clientId)
				.addSearchParam('client_secret', clientSecret)
				.addSearchParam('redirect_uri', redirectUri)
				.addSearchParam('grant_type', 'authorization_code')
				.toString()
			const response = await this._httpClient.post({ url })
			return this._restHelixRequestParser.accessTokenResponse(response)
		} catch (error) {
			if (error instanceof HttpError && error.status === 400) {
				throw new InvalidAuthorizationError('Invalid authorization code')
			}
			throw error
		}
	}

	async getAccessToken(code) {
		try {
			const { clientId, clientSecret } = this._config.helix
			const redirectUri = `${this._config.server.domainUrl}/api/v1/auth/token`
			const url = new URLBuilder('https://id.twitch.tv/oauth2/token')
				.addSearchParam('code', code)
				.addSearchParam('client_id', clientId)
				.addSearchParam('client_secret', clientSecret)
				.addSearchParam('redirect_uri', redirectUri)
				.addSearchParam('grant_type', 'authorization_code')
				.toString()
			const response = await this._httpClient.post({ url })
			return this._restHelixRequestParser.accessTokenResponse(response)
		} catch (error) {
			if (error instanceof HttpError && error.status === 400) {
				throw new InvalidAuthorizationError('Invalid authorization code')
			}
			throw error
		}
	}

	async refreshAccessToken(refreshToken) {
		try {
			const { clientId, clientSecret } = this._config.helix
			const url = new URLBuilder('https://id.twitch.tv/oauth2/token')
				.addSearchParam('refresh_token', refreshToken)
				.addSearchParam('client_id', clientId)
				.addSearchParam('client_secret', clientSecret)
				.addSearchParam('grant_type', 'refresh_token')
				.toString()
			const response = await this._httpClient.post({ url })
			return this._restHelixRequestParser.accessTokenResponse(response)
		} catch (error) {
			if ((error instanceof HttpError && error.status === 400) || error.status === 401) {
				throw new InvalidAuthorizationError('Invalid refresh token')
			}
			throw error
		}
	}

	async getUserData(accessToken) {
		try {
			const url = 'https://api.twitch.tv/helix/users'
			const headers = {
				'Client-Id': this._config.helix.clientId,
				Authorization: `Bearer ${accessToken}`,
			}
			const response = await this._httpClient.get({ url, options: { headers } })
			return this._restHelixRequestParser.userDataResponse(response.data[0])
		} catch (error) {
			if (error instanceof HttpError && error.status === 401) {
				throw new InvalidAuthorizationError('Invalid access token')
			}
			throw error
		}
	}
}
