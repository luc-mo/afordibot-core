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
	}
}
