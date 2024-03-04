import { RefreshAccessTokenCommand } from './refresh-access-token-command'
import { RefreshAccessTokenResponse } from './refresh-access-token-response'

export class RefreshAccessToken {
	constructor({ restHelixClient }) {
		this._restHelixClient = restHelixClient
	}

	async execute({ refreshToken }) {
		const tokenData = await this._restHelixClient.refreshAccessToken(refreshToken)
		return new RefreshAccessTokenResponse({
			accessToken: tokenData.accessToken,
			expiresIn: tokenData.expiresIn,
			refreshToken: tokenData.refreshToken,
			scope: tokenData.scope,
			tokenType: tokenData.tokenType,
		})
	}
}

export { RefreshAccessTokenCommand, RefreshAccessTokenResponse }
