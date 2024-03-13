import type crypto from 'node:crypto'
import type * as mongodb from 'mongodb'
import type { config } from '@/infrastructure/config'

import type { IdGenerator, Cipher } from '@afordibot/core'
import type { CommandPicker } from '@/domain/services/command-picker'
import type { CommandParser } from '@/domain/services/command-parser'

import type { AuthProvider } from '@/infrastructure/irc/auth-provider'

import type { MongoDbHandler } from '@/infrastructure/persistence/mongo/db-handler'
import type { AuthorizationRepository } from '@/infrastructure/persistence/mongo/authorization/repository'
import type { UserRepository } from '@/infrastructure/persistence/mongo/user/repository'

import type { authorizationDocumentParser } from '@/infrastructure/persistence/mongo/authorization/document-parser'
import type { userDocumentParser } from '@/infrastructure/persistence/mongo/user/document-parser'

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

	// Persistence
	dbHandler: MongoDbHandler
	authorizationRepository: AuthorizationRepository
	userRepository: UserRepository

	authorizationDocumentParser: typeof authorizationDocumentParser
	userDocumentParser: typeof userDocumentParser
}
