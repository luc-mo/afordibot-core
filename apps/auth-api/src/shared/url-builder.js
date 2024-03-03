import * as R from 'ramda'

export class URLBuilder {
	constructor(url) {
		this.url = new URL(url)
	}

	addParams(param) {
		this.url.pathname = R.concat(this.url.pathname, param)
		return this
	}

	addSearchParam(name, value) {
		this.url.searchParams.append(name, value)
		return this
	}

	toString() {
		return this.url.toString()
	}
}
