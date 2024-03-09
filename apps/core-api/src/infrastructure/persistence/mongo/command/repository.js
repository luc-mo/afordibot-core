export class CommandRepository {
	_COLLECTION = 'commands'

	constructor({ mongodb, dbHandler, commandDocumentParser }) {
		this._mongodb = mongodb
		this._dbHandler = dbHandler
		this._commandDocumentParser = commandDocumentParser
	}

	async findById(id) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const document = await collection.findOne({ _id: new this._mongodb.UUID(id) })
		return document ? this._commandDocumentParser.toDomain(document) : null
	}

	async findByHelixUserId(helixUserId) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const documents = await collection.find({ helixUserId }).toArray()
		return documents.map((document) => this._commandDocumentParser.toDomain(document))
	}

	async findByNameAndHelixUserId(name, helixUserId) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const query = { helixUserId, names: { $in: [name] } }
		const document = await collection.findOne(query)
		return document ? this._commandDocumentParser.toDomain(document) : null
	}

	async save(command) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const document = this._commandDocumentParser.toDocument(command)
		await collection.updateOne({ _id: document._id }, { $set: document }, { upsert: true })
	}
}
