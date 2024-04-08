export class UserRepository {
	_COLLECTION = 'users'

	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ mongodb, dbHandler, userDocumentParser }) {
		this._mongodb = mongodb
		this._dbHandler = dbHandler
		this._userDocumentParser = userDocumentParser
	}

	async findAll() {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const documents = await collection.find({ enabled: true }).toArray()
		return documents.map((document) => this._userDocumentParser.toDomain(document))
	}

	async findById(id) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const document = await collection.findOne({ _id: new this._mongodb.UUID(id) })
		return document ? this._userDocumentParser.toDomain(document) : null
	}

	async findByHelixId(helixId) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const document = await collection.findOne({ helixId })
		return document ? this._userDocumentParser.toDomain(document) : null
	}

	async save(user) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const document = this._userDocumentParser.toDocument(user)
		await collection.updateOne({ _id: document._id }, { $set: document }, { upsert: true })
	}
}
