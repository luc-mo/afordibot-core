export class UseCommandCommand {
	constructor({ name, helixUserId, username, sender, receiver, viewerPermissions }) {
		this.name = name
		this.helixUserId = helixUserId
		this.username = username
		this.sender = sender
		this.receiver = receiver
		this.viewerPermissions = viewerPermissions
	}
}
