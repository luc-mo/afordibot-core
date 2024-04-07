export interface IDomainEventMetadata {
	id: string
	type: string
	source: string
	version: number
	timestamp: number
}

export class DomainEvent<IEventPayload extends object> {
	public readonly payload: IEventPayload
	public readonly meta: IDomainEventMetadata

	constructor(payload: IEventPayload, meta: IDomainEventMetadata) {
		this.payload = payload
		this.meta = meta
	}

	public toBuffer(): Buffer {
		const eventData = JSON.stringify({
			meta: this.meta,
			payload: this.payload,
		})
		return Buffer.from(eventData, 'utf-8')
	}
}
