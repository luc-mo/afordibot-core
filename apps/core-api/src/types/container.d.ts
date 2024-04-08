import type crypto from 'node:crypto'
import type axios from 'axios'
import type * as mongodb from 'mongodb'

import type { IdGenerator, Cipher } from '@afordibot/core'
import type { config } from '@/infrastructure/config'

import type { AxiosHttpClient } from '@/infrastructure/services/axios-http-client'

import { MongoDbHandler } from '@/infrastructure/persistence/mongo/db-handler'
import { UserRepository } from '@/infrastructure/persistence/mongo/user/repository'
import { CommandRepository } from '@/infrastructure/persistence/mongo/command/repository'

import { userDocumentParser } from '@/infrastructure/persistence/mongo/user/document-parser'
import { commandDocumentParser } from '@/infrastructure/persistence/mongo/command/document-parser'

export interface Container {
	// Libraries
	crypto: typeof crypto
	axios: typeof axios
	mongodb: typeof mongodb

	// Config
	config: typeof config

	// Domain services
	idGenerator: IdGenerator
	cipher: Cipher

	// Infrastructure services
	httpClient: AxiosHttpClient

	// Persistence
	dbHandler: MongoDbHandler

	// Repositories
	userRepository: UserRepository
	commandRepository: CommandRepository

	// Document parsers
	userDocumentParser: typeof userDocumentParser
	commandDocumentParser: typeof commandDocumentParser
}
