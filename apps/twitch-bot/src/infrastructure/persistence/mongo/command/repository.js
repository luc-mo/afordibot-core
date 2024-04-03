export class CommandRepository {
	_COLLECTION = 'commands'

	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ dbHandler, commandDocumentParser }) {
		this._dbHandler = dbHandler
		this._commandDocumentParser = commandDocumentParser
	}

	async findByIdOrName({ id, name }) {
		const instance = await this._dbHandler.getInstance()
		const collection = instance.collection(this._COLLECTION)
		const query = { $or: [{ id }, { names: { $in: [name] } }] }
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
