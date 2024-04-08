export const restHelixRequestParser = () => {
	return {
		validateToken: (response) => {
			return {
				clientId: response.client_id,
				helixId: response.user_id,
				username: response.login,
				expiresIn: response.expires_in,
				scopes: response.scopes,
			}
		},
		helixUser: (response) => {
			return {
				id: response.id,
				username: response.login,
				displayName: response.display_name,
				type: response.type,
				broadcasterType: response.broadcaster_type,
				description: response.description,
				profileImageUrl: response.profile_image_url,
				offlineImageUrl: response.offline_image_url,
				viewCount: response.view_count,
				createdAt: response.created_at,
			}
		},
	}
}
