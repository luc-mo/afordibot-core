export class InvalidTimestampError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidTimestampError'
	}
}
