import { DatabaseError } from '@/domain/errors'

export class FirebaseRealtimeDbHandler {
	_app = null
	_db = null
	_instance = null

	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ admin, config }) {
		this._admin = admin
		this._config = config
	}

	_connect() {
		try {
			this._app = this._admin.initializeApp({
				credential: this._admin.credential.cert({
					projectId: this._config.firebase.projectId,
					clientEmail: this._config.firebase.clientEmail,
					privateKey: this._config.firebase.privateKey,
				}),
				databaseURL: this._config.firebaseConfig.databaseURL,
			})
			this._db = this._admin.database(this._app)
			return this._db
		} catch (error) {
			throw new DatabaseError(`Error in realtime database connection: ${error}`)
		}
	}

	_createInstance() {
		return this._connect()
	}

	getInstance() {
		if (!this._instance) {
			this._instance = this._createInstance()
		}
		return this._instance
	}

	disconnect() {
		if (this._app) {
			this._app.delete()
		}
		this._app = null
		this._db = null
		this._instance = null
	}
}
