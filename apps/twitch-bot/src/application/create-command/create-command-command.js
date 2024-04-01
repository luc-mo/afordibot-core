export class CreateCommandCommand {
	constructor({ helixUserId, name, message, value, permission, timeout, viewerPermissions }) {
		this.helixUserId = helixUserId
		this.name = name
		this.message = message
		this.value = value
		this.timeout = timeout
		this.permission = permission
		this.viewerPermissions = viewerPermissions
	}
}
