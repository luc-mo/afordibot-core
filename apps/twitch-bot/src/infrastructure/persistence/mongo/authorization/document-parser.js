import { Authorization } from '@afordibot/core'
import { getValue } from '@/shared/functions'

/**
 * @typedef { import('@/types/container').Container Container }
 * @param {Container} dependencies
 */
export const authorizationDocumentParser = ({ mongodb, cipher }) => {
	return {
		toDomain: ({ _id, helixUserId, accessToken, refreshToken, expiresIn, scope }) => {
			const id = _id.toString()
			const decryptedAccessToken = cipher.decrypt(accessToken)
			const decryptedRefreshToken = cipher.decrypt(refreshToken)
			return new Authorization({
				id,
				helixUserId,
				expiresIn,
				scope,
				accessToken: decryptedAccessToken,
				refreshToken: decryptedRefreshToken,
			})
		},
		toDocument: ({ id, helixUserId, accessToken, refreshToken, expiresIn, scope }) => {
			const _id = new mongodb.UUID(getValue(id))
			const encryptedAccessToken = cipher.encrypt(accessToken)
			const encryptedRefreshToken = cipher.encrypt(refreshToken)
			return {
				_id,
				expiresIn,
				scope,
				helixUserId: getValue(helixUserId),
				accessToken: encryptedAccessToken,
				refreshToken: encryptedRefreshToken,
			}
		},
	}
}
