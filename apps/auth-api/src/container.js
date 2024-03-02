import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import crypto from 'node:crypto'
import axios from 'axios'
import * as mongodb from 'mongodb'

import { IdGenerator, Cipher } from '@afordibot/core'

const container = createContainer({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	crypto: asValue(crypto),
	axios: asValue(axios),
	mongodb: asValue(mongodb),

	// Domain services
	idGenerator: asClass(IdGenerator),
	cipher: asClass(Cipher),
})

export { container }
