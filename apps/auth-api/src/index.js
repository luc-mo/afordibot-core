import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { config } from './infrastructure/config'
import { authController } from './infrastructure/http/auth-controller'

const { port } = config.server
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

app.use('/api/v1/auth', authController)

app.listen(port, () => {
	console.log(`Auth API listening at http://localhost:${port}`)
})
