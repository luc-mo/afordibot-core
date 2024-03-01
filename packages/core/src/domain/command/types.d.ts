import type { IUUID } from '@/domain/uuid'
import type { IHelixUserId } from '@/domain/helix-user-id'
import type { ITimestamp } from '@/domain/timestamp'

export interface IName {
	value: string
}

export interface IMessage {
	value: string
}

export interface IValue {
	value: string
}

export interface IPermission {
	value: string
}

export interface ITimeout {
	value: string
}

export interface ICommand {
	id: IUUID
	userId: IUUID
	helixUserId: IHelixUserId
	names: IName[]
	messages: IMessage[]
	values: IValue[]
	permission: IPermission
	timeout: ITimeout
	enabled: boolean
	timestamp: ITimestamp
	createdBy: IHelixUserId
	updatedBy: IHelixUserId
}
