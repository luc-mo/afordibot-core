import * as R from 'ramda'
import { ChatClient } from '@twurple/chat'

import { HealthCheckCommand } from '@/application/health-check'

export class IRCClient {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({
		config,
		authProvider,
		viewerPermissionsHandler,
		commandPicker,
		healthCheck,
		findBotUsernames,
	}) {
		this._config = config
		this._authProvider = authProvider
		this._viewerPermissionsHandler = viewerPermissionsHandler
		this._commandPicker = commandPicker

		this._healthCheck = healthCheck
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

	_onHealthCheck({ channel, viewerPermissions }) {
		const command = new HealthCheckCommand(viewerPermissions)
		const response = this._healthCheck.execute(command)
		this._client.say(channel, response.message)
	}
}
