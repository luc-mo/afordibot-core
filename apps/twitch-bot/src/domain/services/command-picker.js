import * as R from 'ramda'

export class CommandPicker {
	_HEALTH_CHECK_REGEX = /^!afordihealth(?:\s+.*)?$/i
	_JOIN_CHANNEL_REGEX = /^!afordijoin(?:\s+.*)?$/i
	_LEAVE_CHANNEL_REGEX = /^!afordileave(?:\s+.*)?$/i
	_CREATE_COMMAND_REGEX = /^!afordicreate command(?:\s+.*)?$/i
	_CHANNEL_COMMAND_REGEX = /^!(\w{1,25})(?:\s+.*)?$/i

	get healthCheck() {
		return R.test(this._HEALTH_CHECK_REGEX)
	}

	get joinChannel() {
		return R.test(this._JOIN_CHANNEL_REGEX)
	}

	get leaveChannel() {
		return R.test(this._LEAVE_CHANNEL_REGEX)
	}

	get createCommand() {
		return R.test(this._CREATE_COMMAND_REGEX)
	}

	get channelCommand() {
		return R.test(this._CHANNEL_COMMAND_REGEX)
	}
}
