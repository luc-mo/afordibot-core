import { Command } from '@afordibot/core'
import { getValue } from '@/shared/functions'

export const commandDocumentParser = ({ mongodb }) => {
	return {
		toDomain: ({
			_id,
			userId,
			helixUserId,
			names,
			messages,
			values,
			permission,
			timeout,
			enabled,
			createdAt,
			updatedAt,
			createdBy,
			updatedBy,
		}) => {
			return new Command({
				id: _id.toString(),
				userId: userId.toString(),
				helixUserId,
				names,
				messages,
				values,
				permission,
				timeout,
				createdAt: createdAt.getTime(),
				updatedAt: updatedAt.getTime(),
				createdBy,
				updatedBy,
				enabled,
			})
		},
		toDocument: ({
			id,
			userId,
			helixUserId,
			names,
			messages,
			values,
			permission,
			timeout,
			timestamp,
			createdBy,
			updatedBy,
			enabled,
		}) => {
			return {
				_id: new mongodb.UUID(getValue(id)),
				userId: new mongodb.UUID(getValue(userId)),
				helixUserId: getValue(helixUserId),
				names: names.map(getValue),
				messages: messages.map(getValue),
				values: values.map(getValue),
				permission: getValue(permission),
				timeout: getValue(timeout),
				createdAt: new Date(timestamp.createdAt),
				updatedAt: new Date(timestamp.updatedAt),
				createdBy: getValue(createdBy),
				updatedBy: getValue(updatedBy),
				enabled,
			}
		},
	}
}
