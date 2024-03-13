import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import crypto from 'node:crypto'
import * as mongodb from 'mongodb'
import { config } from './infrastructure/config'

import { IdGenerator, Cipher } from '@afordibot/core'
import { CommandPicker } from './domain/services/command-picker'
import { CommandParser } from './domain/services/command-parser'

import { AuthProvider } from './infrastructure/irc/auth-provider'

import { MongoDbHandler } from './infrastructure/persistence/mongo/db-handler'
import { AuthorizationRepository } from './infrastructure/persistence/mongo/authorization/repository'
import { UserRepository } from './infrastructure/persistence/mongo/user/repository'

import { authorizationDocumentParser } from './infrastructure/persistence/mongo/authorization/document-parser'
import { userDocumentParser } from './infrastructure/persistence/mongo/user/document-parser'

import { FindBotUsernames } from './application/find-bot-usernames'

const container = createContainer({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	crypto: asValue(crypto),
	mongodb: asValue(mongodb),

	// Config
	config: asValue(config),

	// Domain services
	idGenerator: asClass(IdGenerator),
	cipher: asClass(Cipher),
	commandPicker: asClass(CommandPicker),
	commandParser: asClass(CommandParser),

	// IRC
	authProvider: asClass(AuthProvider).singleton(),

	// Persistence
	dbHandler: asClass(MongoDbHandler).singleton(),
	authorizationRepository: asClass(AuthorizationRepository),
	userRepository: asClass(UserRepository),

	authorizationDocumentParser: asFunction(authorizationDocumentParser),
	userDocumentParser: asFunction(userDocumentParser),

	// Use cases
	findBotUsernames: asClass(FindBotUsernames),
})

export { container }
