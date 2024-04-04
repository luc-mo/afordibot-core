export class TimeoutCommandError extends Error {
	public constructor(message: string) {
		super(message)
		this.name = 'TimeoutCommandError'
	}
}
