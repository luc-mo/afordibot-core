export class RealtimeCommandRepository {
	_COLLECTION = 'v2/commands/count'

	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ realtimeDbHandler }) {
		this._realtimeDbHandler = realtimeDbHandler
	}

	async findCountByCommandId(id) {
		const instance = this._realtimeDbHandler.getInstance()
		const ref = instance.ref(`${this._COLLECTION}/${id}`)
		const snapshot = await ref.once('value')
		return snapshot.val() ?? 1
	}

	async incrementCountByCommandId(id) {
		const instance = this._realtimeDbHandler.getInstance()
		const ref = instance.ref(`${this._COLLECTION}/${id}`)
		await ref.transaction((count) => (count ?? 0) + 1)
	}
}
