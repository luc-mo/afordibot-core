import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { config } from './infrastructure/config'
import { usersRouter } from './infrastructure/http/users-controller'

const { port } = config.server
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

app.use('/api/v1/users', usersRouter)

app.listen(port, () => {
	console.log(`Core API listening at http://localhost:${port}`)
})
