import amqp from 'amqplib'

export class AMQPClient {
	_EXCHANGE = 'domain_events'
	_client = null
	_channel = null
	_instance = null

	/**
	 * @typedef { import('@/types/container').Container Container }
	 * @param {Container} dependencies
	 */
	constructor({ config }) {
		this._config = config
	}

	async _connect() {
		try {
			this._client = await amqp.connect(this._config.server.amqpUrl)
			this._channel = await this._client.createChannel()
			this._channel.assertExchange(this._EXCHANGE, 'topic', { durable: false })
			return this._channel
		} catch (error) {
			throw new Error(`Error in amqp connection: ${error}`)
		}
	}

	async _createInstance() {
		if (!this._instance) {
			this._instance = await this._connect()
		}
		return this._instance
	}

	async publish(event) {
		const instance = await this._createInstance()
		await instance.publish(this._EXCHANGE, event.meta.type, event.toBuffer())
	}

	async consume(key, onMessage) {
		const instance = await this._createInstance()
		const { queue } = await instance.assertQueue('', { exclusive: true })
		await instance.bindQueue(queue, this._EXCHANGE, key)
		instance.consume(queue, onMessage, { noAck: true })
	}
}
