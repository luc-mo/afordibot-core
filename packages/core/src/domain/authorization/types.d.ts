import type { IUUID } from '@/domain/uuid'
import type { IHelixUserId } from '@/domain/helix-user-id'

export interface IAuthorization {
	id: IUUID
	helixUserId: IHelixUserId
	accessToken: string
	refreshToken: string
	expiresIn: number
	scope: string[]
}
