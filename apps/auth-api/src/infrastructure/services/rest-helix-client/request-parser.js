export const restHelixRequestParser = () => {
	return {
		accessTokenResponse: (response) => {
			return {
				accessToken: response.access_token,
				refreshToken: response.refresh_token,
				expiresIn: response.expires_in,
				tokenType: response.token_type,
				scope: response.scope,
			}
		},
		userDataResponse: (response) => {
			return {
				id: response.id,
				username: response.login,
				displayName: response.display_name,
				profileImageUrl: response.profile_image_url,
				offlineImageUrl: response.offline_image_url,
				description: response.description,
				broadcasterType: response.broadcaster_type,
				viewCount: response.view_count,
				createdAt: response.created_at,
				type: response.type,
			}
		},
	}
}
