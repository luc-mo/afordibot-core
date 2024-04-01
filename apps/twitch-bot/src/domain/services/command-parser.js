import * as R from 'ramda'
import { Maybe } from '@/shared/maybe'

export class CommandParser {
	_NAME_OPTION_REGEX = /name:\s*(.*?)/
	_MESSAGE_OPTION_REGEX = /msg:\s*(.*?)/
	_VALUE_OPTION_REGEX = /value:\s*(.*?)/
	_PERMISSION_OPTION_REGEX = /perm:\s*(.*?)/
	_TIMEOUT_OPTION_REGEX = /timeout:\s*(.*?)/

	parseCreateCommand(message) {
		const matcher = /(?= name:| msg:| value:| perm:| timeout:|$)/
		const regExps = this._createCommandRegExps(matcher)
		const parser = R.curry(this._parseOption)(message)
		return {
			name: parser(regExps.name).valueOf(),
			message: parser(regExps.message).valueOf(),
			value: parser(regExps.value).valueOf(),
			permission: parser(regExps.permission).orElse('everyone'),
			timeout: parser(regExps.timeout).bind(parseInt).orElse(0),
		}
	}

	_createCommandRegExps(matcher) {
		const joinSources = R.curry(this._joinMatcherSource)(matcher)
		return {
			name: joinSources(this._NAME_OPTION_REGEX),
			message: joinSources(this._MESSAGE_OPTION_REGEX),
			value: joinSources(this._VALUE_OPTION_REGEX),
			permission: joinSources(this._PERMISSION_OPTION_REGEX),
			timeout: joinSources(this._TIMEOUT_OPTION_REGEX),
		}
	}

	_joinMatcherSource(matcher, regExp) {
		return new Maybe([regExp, matcher])
			.bind(R.map(R.prop('source')))
			.bind(R.join(''))
			.bind(RegExp)
			.valueOf()
	}

	_parseOption(message, regExp) {
		return new Maybe(message).bind(R.match(regExp)).bind(R.nth(1))
	}
}
