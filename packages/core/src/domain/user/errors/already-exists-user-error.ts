export class AlreadyExistsUserError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'AlreadyExistsUserError'
	}
}
