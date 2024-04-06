export class NotFoundValidCommandMessageError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'NotFoundValidCommandMessageError'
	}
}
