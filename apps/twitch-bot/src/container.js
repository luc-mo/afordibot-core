import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import crypto from 'node:crypto'
import axios from 'axios'
import admin from 'firebase-admin'
import * as mongodb from 'mongodb'
import { config } from './infrastructure/config'

import { IdGenerator, Cipher } from '@afordibot/core'
import { CommandPicker } from './domain/services/command-picker'
import { CommandParser } from './domain/services/command-parser'
import { CommandTimeoutHandler } from '@/domain/services/command-timeout-handler'

import { AxiosHttpClient } from './infrastructure/services/axios-http-client'
import { RestHelixClient } from './infrastructure/services/rest-helix-client'

import { AMQPClient } from './infrastructure/amqp/amqp-client'
import { AuthProvider } from './infrastructure/irc/auth-provider'
import { IRCClient } from './infrastructure/irc/irc-client'
import { viewerPermissionsHandler } from './infrastructure/irc/handlers/viewer-permissions-handler'

import { MongoDbHandler } from './infrastructure/persistence/mongo/db-handler'
import { FirebaseRealtimeDbHandler } from './infrastructure/persistence/firebase/realtime-db-handler'

import { AuthorizationRepository } from './infrastructure/persistence/mongo/authorization/repository'
import { UserRepository } from './infrastructure/persistence/mongo/user/repository'
import { CommandRepository } from './infrastructure/persistence/mongo/command/repository'
import { RealtimeCommandRepository } from '@/infrastructure/persistence/firebase/command/repository'

import { authorizationDocumentParser } from './infrastructure/persistence/mongo/authorization/document-parser'
import { userDocumentParser } from './infrastructure/persistence/mongo/user/document-parser'
import { commandDocumentParser } from './infrastructure/persistence/mongo/command/document-parser'

import { HealthCheck } from './application/health-check'
import { FindBotUsernames } from './application/find-bot-usernames'
import { JoinChannel } from './application/join-channel'
import { LeaveChannel } from './application/leave-channel'
import { CreateCommand } from './application/create-command'
import { UseCommand } from './application/use-command'

const container = createContainer({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	crypto: asValue(crypto),
	axios: asValue(axios),
	admin: asValue(admin),
	mongodb: asValue(mongodb),

	// Config
	config: asValue(config),

	// Domain services
	idGenerator: asClass(IdGenerator),
	cipher: asClass(Cipher),
	commandPicker: asClass(CommandPicker),
	commandParser: asClass(CommandParser),
	commandTimeoutHandler: asClass(CommandTimeoutHandler).singleton(),

	// Infrastructure services
	httpClient: asClass(AxiosHttpClient),
	restHelixClient: asClass(RestHelixClient),

	// AMQP
	amqpClient: asClass(AMQPClient).singleton(),

	// IRC
	authProvider: asClass(AuthProvider).singleton(),
	ircClient: asClass(IRCClient).singleton(),
	viewerPermissionsHandler: asValue(viewerPermissionsHandler),

	// Persistence
	dbHandler: asClass(MongoDbHandler).singleton(),
	realtimeDbHandler: asClass(FirebaseRealtimeDbHandler).singleton(),

	// Repositories
	authorizationRepository: asClass(AuthorizationRepository),
	userRepository: asClass(UserRepository),
	commandRepository: asClass(CommandRepository),
	realtimeCommandRepository: asClass(RealtimeCommandRepository),

	// Document parsers
	authorizationDocumentParser: asFunction(authorizationDocumentParser),
	userDocumentParser: asFunction(userDocumentParser),
	commandDocumentParser: asFunction(commandDocumentParser),

	// Use cases
	healthCheck: asClass(HealthCheck),
	findBotUsernames: asClass(FindBotUsernames),
	joinChannel: asClass(JoinChannel),
	leaveChannel: asClass(LeaveChannel),
	createCommand: asClass(CreateCommand),
	useCommand: asClass(UseCommand),
})

export { container }
