import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import crypto from 'node:crypto'
import axios from 'axios'
import * as mongodb from 'mongodb'

import { IdGenerator, Cipher } from '@afordibot/core'
import { config } from './infrastructure/config'

import { AxiosHttpClient } from './infrastructure/services/axios-http-client'
import { RestHelixClient } from './infrastructure/services/rest-helix-client/client'
import { restHelixRequestParser } from './infrastructure/services/rest-helix-client/request-parser'

import { MongoDbHandler } from './infrastructure/persistence/mongo/db-handler'
import { AuthorizationRepository } from './infrastructure/persistence/mongo/authorization/repository'
import { authorizationDocumentParser } from './infrastructure/persistence/mongo/authorization/document-parser'

import { GetAccessToken } from './application/get-access-token'
import { RefreshAccessToken } from './application/refresh-access-token'
import { UpdateBotToken } from './application/update-bot-token'

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

	// Config
	config: asValue(config),

	// Infrastructure services
	httpClient: asClass(AxiosHttpClient),
	restHelixClient: asClass(RestHelixClient),
	restHelixRequestParser: asFunction(restHelixRequestParser),

	// Persistence
	dbHandler: asClass(MongoDbHandler).singleton(),
	authorizationRepository: asClass(AuthorizationRepository),
	authorizationDocumentParser: asFunction(authorizationDocumentParser),

	// Use cases
	getAccessToken: asClass(GetAccessToken),
	refreshAccessToken: asClass(RefreshAccessToken),
	updateBotToken: asClass(UpdateBotToken),
})

export { container }
