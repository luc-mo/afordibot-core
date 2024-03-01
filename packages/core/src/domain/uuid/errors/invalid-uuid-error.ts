export class InvalidUUIDError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidUUIDError'
	}
}
