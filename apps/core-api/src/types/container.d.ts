import type crypto from 'node:crypto'
import type axios from 'axios'
import type * as mongodb from 'mongodb'

import type { IdGenerator, Cipher } from '@afordibot/core'
import type { config } from '@/infrastructure/config'

import type { AxiosHttpClient } from '@/infrastructure/services/axios-http-client'
import type { RestHelixClient } from '@/infrastructure/services/rest-helix-client/client'
import type { restHelixRequestParser } from '@/infrastructure/services/rest-helix-client/request-parser'

import type { MongoDbHandler } from '@/infrastructure/persistence/mongo/db-handler'
import type { UserRepository } from '@/infrastructure/persistence/mongo/user/repository'
import type { CommandRepository } from '@/infrastructure/persistence/mongo/command/repository'

import type { userDocumentParser } from '@/infrastructure/persistence/mongo/user/document-parser'
import type { commandDocumentParser } from '@/infrastructure/persistence/mongo/command/document-parser'

import type { JoinChannel } from '@/application/join-channel'

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
	restHelixClient: RestHelixClient
	restHelixRequestParser: ReturnType<typeof restHelixRequestParser>

	// Persistence
	dbHandler: MongoDbHandler

	// Repositories
	userRepository: UserRepository
	commandRepository: CommandRepository

	// Document parsers
	userDocumentParser: ReturnType<typeof userDocumentParser>
	commandDocumentParser: ReturnType<typeof commandDocumentParser>

	// Use cases
	joinChannel: JoinChannel
}
