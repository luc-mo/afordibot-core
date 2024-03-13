export class UserRepository {
	_COLLECTION = 'users'

	constructor({ dbHandler, userDocumentParser }) {
		this._dbHandler = dbHandler
		this._userDocumentParser = userDocumentParser
	}

	async findAll() {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const documents = await collection.find({ enabled: true }).toArray()
		return documents.map((document) => this._userDocumentParser.toDomain(document))
	}
}
