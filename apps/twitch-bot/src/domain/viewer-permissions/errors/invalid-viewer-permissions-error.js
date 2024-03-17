export class InvalidViewerPermissionsError extends Error {
	constructor(message) {
		super(message)
		this.name = 'InvalidViewerPermissionsError'
	}
}
