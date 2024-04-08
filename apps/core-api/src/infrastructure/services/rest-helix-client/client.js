export class RestHelixClient {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ config, httpClient, restHelixRequestParser }) {
		this._config = config
		this._httpClient = httpClient
		this._restHelixRequestParser = restHelixRequestParser
	}

	async validateToken(token) {
		const headers = { Authorization: `OAuth ${token}` }
		const url = 'https://id.twitch.tv/oauth2/validate'
		const response = await this._httpClient.get({ url, options: { headers } })
		return this._restHelixRequestParser.validateToken(response)
	}

	async getUserById(id, token) {
		const url = `https://api.twitch.tv/helix/users?id=${id}`
		const headers = this._createAuthHeaders(token)
		const { data } = await this._httpClient.get({ url, options: { headers } })
		return this._restHelixRequestParser.helixUser(data[0])
	}

	_createAuthHeaders(token) {
		return {
			Authorization: `Bearer ${token}`,
			'Client-ID': this._config.helix.clientId,
			'Content-Type': 'application/json',
		}
	}
}
