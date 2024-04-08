import { DomainEvent, type IDomainEventMetadata } from '@/domain/events/domain-event'

class UserDisabledEventPayload {
	public readonly userId: string

	constructor(userId: string) {
		this.userId = userId
	}
}

export class UserDisabledEvent extends DomainEvent<UserDisabledEventPayload> {
	constructor(userId: string, meta: IDomainEventMetadata) {
		super(new UserDisabledEventPayload(userId), meta)
	}
}
