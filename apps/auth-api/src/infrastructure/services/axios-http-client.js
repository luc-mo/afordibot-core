import * as R from 'ramda'
import { HttpError, UnexpectedError } from '@/domain/errors'

export class AxiosHttpClient {
	constructor({ axios }) {
		this._axios = axios
	}

	get client() {
		return this._axios
	}

	async post({ url, body, options }) {
		const { data } = await this._axios.post(url, body, options).catch(this._handleError.bind(this))
		return data
	}

	async get({ url, options }) {
		const { data } = await this._axios.get(url, options).catch(this._handleError.bind(this))
		return data
	}

	_handleError(error) {
		if (this._isResponseError(error)) {
			throw new HttpError({
				message: error.message,
				status: error.response.status,
				data: error.response.data,
			})
		}
		throw new UnexpectedError(error.message)
	}

	_isResponseError(error) {
		const validator = R.allPass([
			R.is(this._axios.AxiosError),
			R.pipe(R.prop('response'), R.isNil, R.not),
		])
		return validator(error)
	}
}
