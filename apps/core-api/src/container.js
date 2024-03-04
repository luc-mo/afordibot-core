import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import axios from 'axios'
import crypto from 'crypto'
import * as mongodb from 'mongodb'

import { IdGenerator, Cipher } from '@afordibot/core'
import { config } from './infrastructure/config'

const container = createContainer({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	axios: asValue(axios),
	crypto: asValue(crypto),
	mongodb: asValue(mongodb),

	// Config
	config: asValue(config),

	// Domain services
	idGenerator: asClass(IdGenerator),
	cipher: asClass(Cipher),
})

export { container }
