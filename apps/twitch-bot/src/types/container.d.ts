import type crypto from 'node:crypto'
import type axios from 'axios'
import type admin from 'firebase-admin'
import type * as mongodb from 'mongodb'
import type { config } from '@/infrastructure/config'

import type { IdGenerator, Cipher } from '@afordibot/core'
import type { CommandPicker } from '@/domain/services/command-picker'
import type { CommandParser } from '@/domain/services/command-parser'
import type { CommandTimeoutHandler } from '@/domain/services/command-timeout-handler'

import type { AxiosHttpClient } from '@/infrastructure/services/axios-http-client'
import type { RestHelixClient } from '@/infrastructure/services/rest-helix-client'

import type { AMQPClient } from '@/infrastructure/amqp/amqp-client'
import type { AuthProvider } from '@/infrastructure/irc/auth-provider'
import type { IRCClient } from '@/infrastructure/irc/irc-client'
import type { viewerPermissionsHandler } from '@/infrastructure/irc/handlers/viewer-permissions-handler'

import type { MongoDbHandler } from '@/infrastructure/persistence/mongo/db-handler'
import type { FirebaseRealtimeDbHandler } from '@/infrastructure/persistence/firebase/realtime-db-handler'

import type { AuthorizationRepository } from '@/infrastructure/persistence/mongo/authorization/repository'
import type { UserRepository } from '@/infrastructure/persistence/mongo/user/repository'
import type { CommandRepository } from '@/infrastructure/persistence/mongo/command/repository'
import type { RealtimeCommandRepository } from '@/infrastructure/persistence/firebase/command/repository'

import type { authorizationDocumentParser } from '@/infrastructure/persistence/mongo/authorization/document-parser'
import type { userDocumentParser } from '@/infrastructure/persistence/mongo/user/document-parser'
import type { commandDocumentParser } from '@/infrastructure/persistence/mongo/command/document-parser'

import type { HealthCheck } from '@/application/health-check'
import type { FindBotUsernames } from '@/application/find-bot-usernames'
import type { JoinChannel } from './application/join-channel'
import type { LeaveChannel } from './application/leave-channel'
import type { FindUserById } from '@/application/find-user-by-id'
import type { CreateCommand } from '@/application/create-command'
import type { UseCommand } from '@/application/use-command'

export interface Container {
	// Libraries
	crypto: typeof crypto
	axios: typeof axios
	mongodb: typeof mongodb
	admin: typeof admin

	// Config
	config: typeof config

	// Domain services
	idGenerator: IdGenerator
	cipher: Cipher
	commandPicker: CommandPicker
	commandParser: CommandParser
	commandTimeoutHandler: CommandTimeoutHandler

	// Infrastructure services
	httpClient: AxiosHttpClient
	restHelixClient: RestHelixClient

	// Auth provider
	amqpClient: AMQPClient
	authProvider: AuthProvider
	ircClient: IRCClient
	viewerPermissionsHandler: ReturnType<typeof viewerPermissionsHandler>

	// Persistence
	dbHandler: MongoDbHandler
	realtimeDbHandler: FirebaseRealtimeDbHandler

	// Repositories
	authorizationRepository: AuthorizationRepository
	userRepository: UserRepository
	commandRepository: CommandRepository
	realtimeCommandRepository: RealtimeCommandRepository

	// Document parsers
	authorizationDocumentParser: ReturnType<typeof authorizationDocumentParser>
	userDocumentParser: ReturnType<typeof userDocumentParser>
	commandDocumentParser: ReturnType<typeof commandDocumentParser>

	// Use cases
	healthCheck: HealthCheck
	findBotUsernames: FindBotUsernames
	joinChannel: JoinChannel
	leaveChannel: LeaveChannel
	findUserById: FindUserById
	createCommand: CreateCommand
	useCommand: UseCommand
}
