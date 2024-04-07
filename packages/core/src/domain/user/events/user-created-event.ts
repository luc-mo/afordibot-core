import { DomainEvent, type IDomainEventMetadata } from '@/domain/events/domain-event'
import type { User } from '@/domain/user'

class UserCreatedEventPayload {
	public readonly user: ReturnType<User['toObject']>

	constructor(user: User) {
		this.user = user.toObject()
	}
}

export class UserCreatedEvent extends DomainEvent<UserCreatedEventPayload> {
	constructor(user: User, meta: IDomainEventMetadata) {
		super(new UserCreatedEventPayload(user), meta)
	}
}
