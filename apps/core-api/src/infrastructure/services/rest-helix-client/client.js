export class RestHelixClient {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ config, httpClient }) {
		this._config = config
		this._httpClient = httpClient
	}

	async validateToken(token) {
		const headers = { Authorization: `OAuth ${token}` }
		const url = 'https://id.twitch.tv/oauth2/validate'
		return await this._httpClient.get({ url, options: { headers } })
	}
}
