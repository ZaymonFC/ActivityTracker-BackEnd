import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as logger from 'morgan'
import * as path from 'path'

import HeroRouter from './routes/HeroRouter'

class App {
  // Store a reference the the express instance
  public express: express.Application

  // Run configuration methods on instance (express)
  constructor () {
    this.express = express()
    this.middleware()
    this.routes()
  }

  private middleware (): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  // Configure the API endpoints
  private routes (): void {
    // Just to get up and running
    const router = express.Router()
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!',
      })
    })
    this.express.use('/', router)
    this.express.use('/api/v1/heroes', HeroRouter)
  }
}

export default new App().express
