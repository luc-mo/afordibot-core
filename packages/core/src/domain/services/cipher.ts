import { FailedDecryptError } from '@/domain/errors'
import type * as crypto from 'node:crypto'

export interface CipherHash {
	content: string
	iv: string
}

export class Cipher {
	private readonly _crypto: typeof crypto
	private readonly _config: Config

	constructor({ crypto, config }: Constructor) {
		this._crypto = crypto
		this._config = config
	}

	encrypt(text: string) {
		const { cipherKey } = this._config.server
		const key = Buffer.from(cipherKey, 'base64')
		const iv = this._crypto.randomBytes(16)
		const cipher = this._crypto.createCipheriv('aes-256-ctr', key, iv)
		const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

		return {
			content: encrypted.toString('hex'),
			iv: iv.toString('hex'),
		}
	}

	decrypt(hash: CipherHash) {
		try {
			const { cipherKey } = this._config.server
			const key = Buffer.from(cipherKey, 'base64')
			const iv = Buffer.from(hash.iv, 'hex')

			const decipher = this._crypto.createDecipheriv('aes-256-ctr', key, iv)
			const decrypted = Buffer.concat([decipher.update(hash.content, 'hex'), decipher.final()])
			return decrypted.toString()
		} catch (error) {
			throw new FailedDecryptError('Decrypt failed')
		}
	}
}

interface Constructor {
	crypto: typeof crypto
	config: Config
}

interface Config {
	server: {
		cipherKey: string
	}
}
