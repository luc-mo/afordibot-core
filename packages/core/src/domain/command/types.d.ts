import type { IUUID } from '@/domain/uuid'
import type { IHelixUserId } from '@/domain/helix-user-id'
import type { ITimestamp } from '@/domain/timestamp'

export interface IName {
	value: string
}

export interface IMessage {
	value: string
}

export interface IMessageRegExps {
	value: RegExp
	user: RegExp
	sender: RegExp
	receiver: RegExp
	count: RegExp
}

export interface IValue {
	value: string
}

export interface IPermission {
	value: string
}

export interface ITimeout {
	value: number
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

export interface IPickMessageProps {
	user: string | undefined
	sender: string | undefined
	receiver: string | undefined
	count: number | undefined
}
