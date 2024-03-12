import * as R from 'ramda'

export class Maybe {
	constructor(value) {
		this.value = value
	}

	bind(fn) {
		if (R.not(R.is(Function, fn))) {
			return new Maybe(null)
		}

		if (R.not(this.exists())) {
			return new Maybe(null)
		}

		return new Maybe(R.tryCatch(fn, R.always(null))(this.value))
	}

	exists() {
		return R.isNotNil(this.value)
	}

	valueOf() {
		return this.value
	}

	orElse(value) {
		return this.exists() ? this.value : value
	}
}
