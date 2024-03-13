import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import axios from 'axios'
import crypto from 'crypto'
import * as mongodb from 'mongodb'

import { IdGenerator, Cipher } from '@afordibot/core'
import { config } from './infrastructure/config'

import { MongoDbHandler } from './infrastructure/persistence/mongo/db-handler'
import { UserRepository } from './infrastructure/persistence/mongo/user/repository'
import { CommandRepository } from './infrastructure/persistence/mongo/command/repository'

import { userDocumentParser } from './infrastructure/persistence/mongo/user/document-parser'
import { commandDocumentParser } from './infrastructure/persistence/mongo/command/document-parser'

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

	// Persistence
	dbHandler: asClass(MongoDbHandler).singleton(),
	userRepository: asClass(UserRepository),
	commandRepository: asClass(CommandRepository),

	userDocumentParser: asFunction(userDocumentParser),
	commandDocumentParser: asFunction(commandDocumentParser),
})

export { container }