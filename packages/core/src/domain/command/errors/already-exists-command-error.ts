export class AlreadyExistsCommandError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'AlreadyExistsCommandError'
	}
}
