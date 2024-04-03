import { User } from '@afordibot/core'
import { getValue } from '@/shared/functions'

/**
 * @typedef { import('@/types/container').Container Container }
 * @param {Container} dependencies
 */
export const userDocumentParser = ({ mongodb }) => {
	return {
		toDomain: ({ _id, helixId, username, displayName, imageUrl, enabled }) => {
			const id = _id.toString()
			return new User({
				id,
				helixId,
				username,
				displayName,
				imageUrl,
				enabled,
			})
		},
		toDocument: ({ id, helixId, username, displayName, imageUrl, enabled }) => {
			const _id = new mongodb.UUID(getValue(id))
			return {
				_id,
				helixId: getValue(helixId),
				username,
				displayName,
				imageUrl,
				enabled,
			}
		},
	}
}
