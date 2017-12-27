import * as debug from 'debug'
import * as http from 'http'
import { parse } from 'url'

import App from './App'

debug('ts-express:server')

const normalizePort = (val: number | string): number | string | boolean => {
  const result: number = (typeof val === 'string') ? parseInt(val, 10) : val

  if (isNaN(result)) {
    return val
  } else if (result >= 0) {
    return result
  } else {
    return true
  }
}

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') { throw error }
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = (): void => {
  const addr = server.address()
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

// Run the App
const port = normalizePort(process.env.PORT || 8080)
App.set('port', port)

// Server Setup
const server = http.createServer(App)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

