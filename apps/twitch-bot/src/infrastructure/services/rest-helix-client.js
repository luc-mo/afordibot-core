export class RestHelixClient {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ config, httpClient, authProvider }) {
		this._config = config
		this._httpClient = httpClient
		this._authProvider = authProvider
	}

	async getUserById(id) {
		const url = `https://api.twitch.tv/helix/users?id=${id}`
		const options = await this._createClientOptions()
		const { data } = await this._httpClient.get({ url, options })
		return this._parseUserData(data[0])
	}

	async _getHelixToken() {
		const instance = await this._authProvider.getInstance()
		const data = await instance.getAppAccessToken()
		return data.accessToken
	}

	async _createClientOptions() {
		const accessToken = await this._getHelixToken()
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-ID': this._config.bot.clientId,
				'Content-Type': 'application/json',
			},
		}
	}

	_parseUserData(data) {
		return {
			id: data.id,
			username: data.login,
			displayName: data.display_name,
			type: data.type,
			broadcasterType: data.broadcaster_type,
			description: data.description,
			profileImageUrl: data.profile_image_url,
			offlineImageUrl: data.offline_image_url,
			viewCount: data.view_count,
			createdAt: data.created_at,
		}
	}
}
