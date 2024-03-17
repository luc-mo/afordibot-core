import * as R from 'ramda'
import { ChatClient } from '@twurple/chat'

export class IRCClient {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ config, authProvider, viewerPermissionsHandler, commandPicker, findBotUsernames }) {
		this._config = config
		this._authProvider = authProvider
		this._viewerPermissionsHandler = viewerPermissionsHandler
		this._commandPicker = commandPicker
		this._findBotUsernames = findBotUsernames
	}

	async connect() {
		const instance = await this._authProvider.getInstance()

		const { defaultChannels } = this._config.bot
		const { usernames } = await this._findBotUsernames.execute()
		const channelNames = R.uniq(R.concat(defaultChannels, usernames))

		this._client = new ChatClient({
			authProvider: instance,
			channels: channelNames,
		})
		this._client.onConnect(() => console.log('Connected to chat'))
		this._client.onMessage(this._onMessage.bind(this))
		this._client.connect()
	}

	_onMessage(channel, username, message, ctx) {
		const viewerPermissions = this._viewerPermissionsHandler(ctx)
		const options = { channel, username, message, ctx, viewerPermissions }

		try {
			const condFn = R.cond([[this._commandPicker.healthCheck, this._onHealthCheck.bind(this)]])
			condFn(options)
		} catch (error) {
			console.error(error)
		}
	}

	_onHealthCheck({ channel }) {
		this._client.say(
			channel,
			'Testeando mi presencia en el chat... Funciono? afordiThinking... Si funciono! afordiHype'
		)
	}
}
