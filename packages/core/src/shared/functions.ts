import * as R from 'ramda'

export const validate =
	(...fns: any[]) =>
	(value: any) =>
		R.allPass(fns)(value)

export const between = R.curry(
	(min: number, max: number, value: number) => R.gte(value, min) && R.lte(value, max)
)

export const pickRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
