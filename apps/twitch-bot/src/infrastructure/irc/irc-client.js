import * as R from 'ramda'
import { ChatClient } from '@twurple/chat'
import { InvalidCommandError, AlreadyExistsCommandError } from '@afordibot/core'

import { HealthCheckCommand } from '@/application/health-check'
import { JoinChannelCommand } from '@/application/join-channel'
import { LeaveChannelCommand } from '@/application/leave-channel'
import { CreateCommandCommand } from '@/application/create-command'

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
		commandParser,
		healthCheck,
		findBotUsernames,
		joinChannel,
		leaveChannel,
		createCommand,
	}) {
		this._config = config
		this._authProvider = authProvider
		this._viewerPermissionsHandler = viewerPermissionsHandler
		this._commandPicker = commandPicker
		this._commandParser = commandParser

		this._healthCheck = healthCheck
		this._findBotUsernames = findBotUsernames
		this._joinChannel = joinChannel
		this._leaveChannel = leaveChannel
		this._createCommand = createCommand
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

	async _onMessage(channel, username, message, ctx) {
		const viewerPermissions = this._viewerPermissionsHandler(ctx)
		const options = { channel, username, message, ctx, viewerPermissions }

		try {
			const condFn = R.cond([
				[this._commandPicker.healthCheck, this._onHealthCheck.bind(this)],
				[this._commandPicker.joinChannel, this._onJoinChannel.bind(this)],
				[this._commandPicker.leaveChannel, this._onLeaveChannel.bind(this)],
				[this._commandPicker.createCommand, this._onCreateCommand.bind(this)],
			])
			await condFn(message, options)
		} catch (error) {
			console.error(error)
		}
	}

	async _onHealthCheck(_, { channel, viewerPermissions }) {
		const command = new HealthCheckCommand(viewerPermissions)
		const response = this._healthCheck.execute(command)
		await this._client.say(channel, response.message)
	}

	async _onJoinChannel(_, { channel, username, ctx }) {
		const command = new JoinChannelCommand(ctx.userInfo.userId)
		await this._joinChannel.execute(command)
		await this._client.join(username)
		await this._client.say(
			channel,
			`@${username}, ahora podrás encontrarme en tu canal afordiLove!`
		)
	}

	async _onLeaveChannel(_, { channel, username, ctx }) {
		const command = new LeaveChannelCommand(ctx.userInfo.userId)
		await this._leaveChannel.execute(command)
		await this._client.part(username)
		await this._client.say(channel, `@${username}, desde ahora no estaré en tu canal afordiSad`)
	}

	async _onCreateCommand(_, { channel, username, message, ctx, viewerPermissions }) {
		const options = this._commandParser.parseCreateCommand(message)
		const helixUserId = ctx.channelId
		try {
			const command = new CreateCommandCommand({ ...options, helixUserId, viewerPermissions })
			await this._createCommand.execute(command)
			await this._client.say(
				channel,
				`@${username}, el comando !${options.name} ha sido creado correctamente!`
			)
		} catch (error) {
			if (error instanceof InvalidCommandError) {
				this._client.say(channel, `@${username}, el comando que intentas no es válido!`)
			} else if (error instanceof AlreadyExistsCommandError) {
				this._client.say(channel, `@${username}, el comando que intentas crear ya existe!`)
			} else {
				throw error
			}
		}
	}
}
