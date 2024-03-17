import { InsufficientPermissionsError } from '@afordibot/core'
import { HealthCheckCommand } from './health-check-command'
import { HealthCheckResponse } from './health-check-response'

export class HealthCheck {
	execute({ viewerPermissions }) {
		this._assertPermissions(viewerPermissions)
		const message =
			'Testeando mi presencia en el chat... Funciono? afordiThinking... Si funciono! afordiHype'
		return new HealthCheckResponse(message)
	}

	_assertPermissions(viewerPermissions) {
		if (!viewerPermissions.isModerator()) {
			throw new InsufficientPermissionsError('Insufficient permissions to use this command')
		}
	}
}

export { HealthCheckCommand, HealthCheckResponse }
