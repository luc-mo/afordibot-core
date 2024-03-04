import express from 'express'
import { container } from '@/container'
import { InvalidAuthorizationError } from '@afordibot/core'

import { GetAccessTokenCommand } from '@/application/get-access-token'
import { RefreshAccessTokenCommand } from '@/application/refresh-access-token'
import { UpdateBotTokenCommand } from '@/application/update-bot-token'

const authController = express.Router()

authController.post('/token', async (req, res) => {
	try {
		const command = new GetAccessTokenCommand(req.query.code)
		const getAccessToken = container.resolve('getAccessToken')
		const response = await getAccessToken.execute(command)
		res.status(200).send(response)
	} catch (error) {
		if (error instanceof InvalidAuthorizationError) {
			res.status(400).send({ message: error.message })
		} else {
			res.status(500).send({ message: 'Internal server error' })
		}
	}
})

authController.post('/bot/token', async (req, res) => {
	try {
		const command = new UpdateBotTokenCommand(req.query.code)
		const updateBotToken = container.resolve('updateBotToken')
		const response = await updateBotToken.execute(command)
		res.status(200).send(response)
	} catch (error) {
		if (error instanceof InvalidAuthorizationError) {
			res.status(400).send({ message: error.message })
		} else {
			res.status(500).send({ message: 'Internal server error' })
		}
	}
})

authController.post('/refresh', async (req, res) => {
	try {
		const command = new RefreshAccessTokenCommand(req.body.refreshToken)
		const refreshAccessToken = container.resolve('refreshAccessToken')
		const response = await refreshAccessToken.execute(command)
		res.status(200).send(response)
	} catch (error) {
		if (error instanceof InvalidAuthorizationError) {
			res.status(400).send({ message: error.message })
		} else {
			res.status(500).send({ message: 'Internal server error' })
		}
	}
})

export { authController }
