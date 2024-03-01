export class FailedDecryptError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'FailedDecryptError'
	}
}
