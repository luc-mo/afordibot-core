import type * as crypto from 'node:crypto'

export class IdGenerator {
	private readonly _crypto: typeof crypto

	constructor({ crypto }: Constructor) {
		this._crypto = crypto
	}

	public generate() {
		return this._crypto.webcrypto.randomUUID()
	}
}

interface Constructor {
	crypto: typeof crypto
}
