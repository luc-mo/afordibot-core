import { getValue } from '@/shared/functions'

export class CommandTimeoutHandler {
	_timeouts = new Map()

	add(command) {
		const id = getValue(command.id)
		const time = getValue(command.timeout)
		this._timeouts.set(
			id,
			setTimeout(() => {
				this._timeouts.delete(id)
			}, time * 1000)
		)
	}

	exists(commandId) {
		return this._timeouts.has(commandId)
	}
}
