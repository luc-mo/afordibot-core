import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import crypto from 'node:crypto'
import axios from 'axios'
import * as mongodb from 'mongodb'

import { IdGenerator, Cipher } from '@afordibot/core'
import { AxiosHttpClient } from './infrastructure/services/axios-http-client'
import { RestHelixClient } from './infrastructure/services/rest-helix-client'

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

	// Infrastructure services
	httpClient: asClass(AxiosHttpClient),
	restHelixClient: asClass(RestHelixClient),
})

export { container }
