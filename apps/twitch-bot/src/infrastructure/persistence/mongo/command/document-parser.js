import { Command } from '@afordibot/core'
import { getValue } from '@/shared/functions'

export const commandDocumentParser = ({ mongodb }) => {
	return {
		toDomain: (document) => {
			return new Command({
				id: document._id.toString(),
				userId: document.userId,
				helixUserId: document.helixUserId,
				names: document.names,
				messages: document.messages,
				values: document.values,
				permission: document.permission,
				timeout: document.timeout,
				enabled: document.enabled,
				createdAt: document.createdAt.getTime(),
				updatedAt: document.updatedAt.getTime(),
				createdBy: document.createdBy,
				updatedBy: document.updatedBy,
			})
		},
		toDocument: (entity) => {
			return {
				_id: new mongodb.UUID(getValue(entity.id)),
				userId: new mongodb.UUID(getValue(entity.userId)),
				helixUserId: getValue(entity.helixUserId),
				names: entity.names.map(getValue),
				messages: entity.messages.map(getValue),
				values: entity.values.map(getValue),
				permission: getValue(entity.permission),
				timeout: getValue(entity.timeout),
				enabled: getValue(entity.enabled),
				createdAt: new Date(entity.timestamp.createdAt),
				updatedAt: new Date(entity.timestamp.updatedAt),
				createdBy: getValue(entity.createdBy),
				updatedBy: getValue(entity.updatedBy),
			}
		},
	}
}
