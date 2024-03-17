import { container } from './container'

const ircClient = container.resolve('ircClient')
ircClient.connect()
