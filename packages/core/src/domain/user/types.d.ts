import type { IUUID } from '@/domain/uuid'
import type { IHelixUserId } from '@/domain/helix-user-id'

export interface IUser {
	id: IUUID
	helixId: IHelixUserId
	username: string
	displayName: string
	imageUrl: string
	enabled: boolean
}
