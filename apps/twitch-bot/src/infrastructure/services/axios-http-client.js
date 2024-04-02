export class AxiosHttpClient {
	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ axios }) {
		this._axios = axios
	}

	get client() {
		return this._axios
	}

	async post({ url, body, options }) {
		const { data } = await this._axios.post(url, body, options)
		return data
	}

	async get({ url, options }) {
		const { data } = await this._axios.get(url, options)
		return data
	}
}
