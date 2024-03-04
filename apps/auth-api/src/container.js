import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import crypto from 'node:crypto'
import axios from 'axios'
import * as mongodb from 'mongodb'

import { IdGenerator, Cipher } from '@afordibot/core'

import { AxiosHttpClient } from './infrastructure/services/axios-http-client'
import { RestHelixClient } from './infrastructure/services/rest-helix-client'

import { MongoDbHandler } from './infrastructure/persistence/mongo/db-handler'
import { AuthorizationRepository } from './infrastructure/persistence/mongo/authorization/repository'
import { authorizationDocumentParser } from './infrastructure/persistence/mongo/authorization/document-parser'

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

	// Persistence
	dbHandler: asClass(MongoDbHandler),
	authorizationRepository: asClass(AuthorizationRepository),
	authorizationDocumentParser: asFunction(authorizationDocumentParser),
})

export { container }
