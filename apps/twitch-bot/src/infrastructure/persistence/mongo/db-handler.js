import { DatabaseError } from '@/domain/errors'

export class MongoDbHandler {
	_client = null
	_database = null
	_instance = null

	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ mongodb, config }) {
		this._mongodb = mongodb
		this._config = config
	}

	async _connect() {
		try {
			this._client = await this._mongodb.MongoClient.connect(this._config.mongo.uri, {
				serverSelectionTimeoutMS: this._config.mongo.timeout,
			})
			this._database = this._client.db(this._config.mongo.dbName)
			return this._database
		} catch (error) {
			throw new DatabaseError(`Error in database connection: ${error}`)
		}
	}

	async _createInstance() {
		const db = await this._connect()
		await db.collection('users').createIndex({ helixId: 1 }, { unique: true })
		await db.collection('authorization').createIndex({ helixUserId: 1 }, { unique: true })
		await db.collection('commands').createIndex({ helixUserId: 1, names: 1 }, { unique: true })
		return await this._connect()
	}

	async getInstance() {
		if (!this._instance) {
			this._instance = await this._createInstance()
		}
		return this._instance
	}

	disconnect() {
		if (this._client) {
			this._client.close()
		}
		this._instance = null
		this._database = null
		this._client = null
	}
}
