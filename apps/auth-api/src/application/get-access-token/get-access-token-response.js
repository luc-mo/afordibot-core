export class GetAccessTokenResponse {
	constructor({ accessToken, expiresIn, refreshToken, scope, tokenType }) {
		this.accessToken = accessToken
		this.expiresIn = expiresIn
		this.refreshToken = refreshToken
		this.scope = scope
		this.tokenType = tokenType
	}
}
