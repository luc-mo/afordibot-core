import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import axios from 'axios'
import crypto from 'crypto'
import * as mongodb from 'mongodb'

import { IdGenerator, Cipher } from '@afordibot/core'
import { config } from './infrastructure/config'

import { AxiosHttpClient } from './infrastructure/services/axios-http-client'
import { RestHelixClient } from './infrastructure/services/rest-helix-client/client'
import { restHelixRequestParser } from './infrastructure/services/rest-helix-client/request-parser'

import { MongoDbHandler } from './infrastructure/persistence/mongo/db-handler'
import { UserRepository } from './infrastructure/persistence/mongo/user/repository'
import { CommandRepository } from './infrastructure/persistence/mongo/command/repository'

import { userDocumentParser } from './infrastructure/persistence/mongo/user/document-parser'
import { commandDocumentParser } from './infrastructure/persistence/mongo/command/document-parser'

import { JoinChannel } from './application/join-channel'

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

	// Infrastructure services
	httpClient: asClass(AxiosHttpClient),
	restHelixClient: asClass(RestHelixClient),
	restHelixRequestParser: asFunction(restHelixRequestParser),

	// Persistence
	dbHandler: asClass(MongoDbHandler).singleton(),

	// Repositories
	userRepository: asClass(UserRepository),
	commandRepository: asClass(CommandRepository),

	// Document parsers
	userDocumentParser: asFunction(userDocumentParser),
	commandDocumentParser: asFunction(commandDocumentParser),

	// Use cases
	joinChannel: asClass(JoinChannel),
})

export { container }
