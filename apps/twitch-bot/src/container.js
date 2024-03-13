import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import * as mongodb from 'mongodb'
import { config } from './infrastructure/config'

import { IdGenerator, Cipher } from '@afordibot/core'
import { CommandPicker } from './domain/services/command-picker'
import { CommandParser } from './domain/services/command-parser'

import { MongoDbHandler } from './infrastructure/persistence/mongo/db-handler'

const container = createContainer({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	mongodb: asValue(mongodb),

	// Config
	config: asValue(config),

	// Domain services
	idGenerator: asClass(IdGenerator),
	cipher: asClass(Cipher),
	commandPicker: asClass(CommandPicker),
	commandParser: asClass(CommandParser),

	// Persistence
	dbHandler: asClass(MongoDbHandler).singleton(),
})

export { container }
