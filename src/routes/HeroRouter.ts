import { NextFunction, Request, Response, Router } from 'express'

const Heroes = require('../data')

//
// ─── ROUTER FOR HERO CRUD ENDPOINT ──────────────────────────────────────────────
//

export class HeroRouter {
  router: Router

  // Initialise the hero router
  constructor () {
    this.router = Router()
    this.init()
  }

  // Get all heroes
  public getAll (req: Request, res: Response, next: NextFunction) {
    res.send(Heroes)
  }

  // Get one hero
  public getSingle (req: Request, res: Response, next: NextFunction) {
    const query = parseInt(req.params.id, 10)
    const hero = Heroes.find(r => r.id === query)
    if (hero) {
      res.status(200)
        .send({
            hero,
            message: 'Success',
            status: res.status,
          },
        )
    }
  }

  // Map each handler to one of the Express.Router endpoints
  init () {
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.getSingle)
  }

}

const heroRoutes = new HeroRouter()
heroRoutes.init()

export default heroRoutes.router
