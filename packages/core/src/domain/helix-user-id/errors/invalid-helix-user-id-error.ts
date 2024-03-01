export class InvalidHelixUserIdError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidHelixUserIdError'
	}
}
