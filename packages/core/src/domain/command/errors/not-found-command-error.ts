export class NotFoundCommandError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'NotFoundCommandError'
	}
}
