import * as R from 'ramda'
import { hasProperties } from '@/shared/functions'

import { container } from '@/container'
import { InvalidTokenError, HttpError } from '@/domain/errors'

const _assertTokenData = (data) => {
	const validator = hasProperties(['clientId', 'helixId', 'username', 'expiresIn', 'scopes'])
	if (!validator(data)) {
		throw new InvalidTokenError('Invalid token data')
	}
}

export const authTokenValidator = async (req, res, next) => {
	try {
		const authToken = req.headers['auth-token']

		if (!authToken) {
			return res.status(401).send({ message: 'Missing access token' })
		}

		const [bearer, token] = authToken.split(' ')

		if (bearer !== 'Bearer') {
			return res.status(401).send({ message: 'Bearer token not present' })
		}

		const restHelixClient = container.resolve('restHelixClient')
		const response = await restHelixClient.validateToken(token)
		_assertTokenData(response)

		req.authTokenData = response
		req.authToken = token
		next()
	} catch (error) {
		const validator = R.is(R.__, error)
		if (validator(InvalidTokenError)) {
			res.status(401).send({ message: error.message })
		} else if (validator(HttpError)) {
			res.status(401).send({ message: 'Invalid access token' })
		} else {
			res.status(500).send({ message: 'Internal server error' })
		}
	}
}
