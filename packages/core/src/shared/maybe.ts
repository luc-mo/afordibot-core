import * as R from 'ramda'

type BindFn<T, U> = (value: NonNullable<T>) => U

export class Maybe<T> {
	private readonly value: T

	constructor(value: T) {
		this.value = value
	}

	public bind<U>(fn: BindFn<T, U>) {
		if (R.not(R.is(Function, fn))) {
			return new Maybe(null)
		}

		if (R.not(this.exists())) {
			return new Maybe(null)
		}

		return new Maybe(R.tryCatch(fn, R.always(null))(this.value!))
	}

	public exists() {
		return R.isNotNil(this.value)
	}

	public valueOf(): T {
		return this.value
	}

	public orElse(value: NonNullable<T>): NonNullable<T> {
		return R.isNotNil(this.value) ? this.value : value
	}
}
