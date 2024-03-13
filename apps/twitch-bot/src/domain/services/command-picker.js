import * as R from 'ramda'

export class CommandPicker {
	_JOIN_CHANNEL_REGEX = /^!afordijoin(?:\s+.*)?$/i
	_LEAVE_CHANNEL_REGEX = /^!afordileave(?:\s+.*)?$/i
	_CREATE_COMMAND_REGEX = /^!afordicreate command(?:\s+.*)?$/i
	_CHANNEL_COMMAND_REGEX = /^!(\w{1,25})(?:\s+.*)?$/i

	joinChannel() {
		return R.test(this._JOIN_CHANNEL_REGEX)
	}

	leaveChannel() {
		return R.test(this._LEAVE_CHANNEL_REGEX)
	}

	createCommand() {
		return R.test(this._CREATE_COMMAND_REGEX)
	}

	channelCommand() {
		return R.test(this._CHANNEL_COMMAND_REGEX)
	}
}
