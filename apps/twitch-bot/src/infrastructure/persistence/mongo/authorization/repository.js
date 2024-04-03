export class AuthorizationRepository {
	_COLLECTION = 'authorization'

	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ dbHandler, authorizationDocumentParser }) {
		this._dbHandler = dbHandler
		this._authorizationDocumentParser = authorizationDocumentParser
	}

	async findByHelixUserId(helixUserId) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const document = await collection.findOne({ helixUserId })
		return document ? this._authorizationDocumentParser.toDomain(document) : null
	}

	async save(authorization) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const document = this._authorizationDocumentParser.toDocument(authorization)
		await collection.updateOne({ _id: document._id }, { $set: document }, { upsert: true })
	}
}
