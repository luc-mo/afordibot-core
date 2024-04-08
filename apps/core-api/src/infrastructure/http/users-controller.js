import { Router } from 'express'
import { container } from '@/container'

import { authTokenValidator } from './middlewares/auth-token-validator'

import { JoinChannelCommand } from '@/application/join-channel'

const usersRouter = Router()

usersRouter.post('/join', authTokenValidator, async (req, res) => {
	try {
		const { helixId } = req.authTokenData
		const helixToken = req.authToken

		const command = new JoinChannelCommand(helixId, helixToken)
		const joinChannel = container.resolve('joinChannel')
		const response = await joinChannel.execute(command)

		res.status(200).send(response)
	} catch (error) {
		res.status(500).send({ message: 'Internal server error' })
	}
})

usersRouter.post('/leave', authTokenValidator, async (req, res) => {
	try {
		const { helixId } = req.authTokenData

		const leaveChannel = container.resolve('leaveChannel')
		await leaveChannel.execute({ helixId })

		res.status(200).send({ message: 'User left channel' })
	} catch (error) {
		res.status(500).send({ message: 'Internal server error' })
	}
})

export { usersRouter }
