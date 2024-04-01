import type crypto from 'node:crypto'
import type * as mongodb from 'mongodb'
import type { config } from '@/infrastructure/config'

import type { IdGenerator, Cipher } from '@afordibot/core'
import type { CommandPicker } from '@/domain/services/command-picker'
import type { CommandParser } from '@/domain/services/command-parser'

import type { AuthProvider } from '@/infrastructure/irc/auth-provider'
import type { viewerPermissionsHandler } from '@/infrastructure/irc/handlers/viewer-permissions-handler'

import type { MongoDbHandler } from '@/infrastructure/persistence/mongo/db-handler'
import type { AuthorizationRepository } from '@/infrastructure/persistence/mongo/authorization/repository'
import type { UserRepository } from '@/infrastructure/persistence/mongo/user/repository'
import type { CommandRepository } from '@/infrastructure/persistence/mongo/command/repository'

import type { authorizationDocumentParser } from '@/infrastructure/persistence/mongo/authorization/document-parser'
import type { userDocumentParser } from '@/infrastructure/persistence/mongo/user/document-parser'
import type { commandDocumentParser } from '@/infrastructure/persistence/mongo/command/document-parser'

import type { HealthCheck } from '@/application/health-check'
import type { FindBotUsernames } from '@/application/find-bot-usernames'
import type { CreateCommand } from '@/application/create-command'

export interface Container {
	// Libraries
	crypto: typeof crypto
	mongodb: typeof mongodb

	// Config
	config: typeof config

	// Domain services
	idGenerator: IdGenerator
	cipher: Cipher
	commandPicker: CommandPicker
	commandParser: CommandParser

	// Auth provider
	authProvider: AuthProvider
	viewerPermissionsHandler: typeof viewerPermissionsHandler

	// Persistence
	dbHandler: MongoDbHandler
	authorizationRepository: AuthorizationRepository
	userRepository: UserRepository
	commandRepository: CommandRepository

	authorizationDocumentParser: typeof authorizationDocumentParser
	userDocumentParser: typeof userDocumentParser
	commandDocumentParser: typeof commandDocumentParser

	// Use cases
	healthCheck: HealthCheck
	findBotUsernames: FindBotUsernames
	createCommand: CreateCommand
}
