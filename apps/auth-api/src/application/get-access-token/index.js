import { GetAccessTokenCommand } from './get-access-token-command'
import { GetAccessTokenResponse } from './get-access-token-response'

export class GetAccessToken {
	constructor({ restHelixClient }) {
		this._restHelixClient = restHelixClient
	}

	async execute({ code }) {
		const tokenData = await this._restHelixClient.getAccessToken(code)
		return new GetAccessTokenResponse({
			accessToken: tokenData.accessToken,
			expiresIn: tokenData.expiresIn,
			refreshToken: tokenData.refreshToken,
			scope: tokenData.scope,
			tokenType: tokenData.tokenType,
		})
	}
}

export { GetAccessTokenCommand, GetAccessTokenResponse }
