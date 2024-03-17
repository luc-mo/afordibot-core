import { ViewerPermissions } from '@/domain/viewer-permissions'

export const viewerPermissionsHandler = (ctx) => {
	return new ViewerPermissions({
		owner: ctx.userInfo.isBroadcaster,
		moderator: ctx.userInfo.isMod,
		vip: ctx.userInfo.isVip,
		subscriber: ctx.userInfo.isSubscriber,
		everyone: true,
	})
}
