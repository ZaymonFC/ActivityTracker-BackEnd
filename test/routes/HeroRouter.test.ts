import * as chai from 'chai'
import chaiHttp = require('chai-http')
import * as mocha from 'mocha'

import app from '../../src/App'

chai.use(chaiHttp)
const expect = chai.expect
const assert = chai.assert

// Describe our CRUD endpoint for manipulating heroes
describe('GET api/v1/heroes', () => {

  it('responds with a JSON array,', () => {
    return chai.request(app).get('/api/v1/heroes')
      .then(res => {
        expect(res.status).to.equal(200)
        assert.exists(res, 'API response must exist')
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length(5)
      })
  })

  it('should include Wolverine', () => {
    return chai.request(app).get('/api/v1/heroes')
      .then((res) => {
        const Wolverine = res.body.find(hero => hero.name === 'Wolverine')
        assert.exists(Wolverine, 'Wolverine must exist in response')
        expect(Wolverine).to.have.all.keys([
          'id',
          'name',
          'aliases',
          'occupation',
          'gender',
          'height',
          'hair',
          'eyes',
          'powers',
        ])
      })
  })

})

// Test getting single rows
describe('GET api/v1/heroes/:id', () => {
  const getString = '/api/v1/heroes/1'

  it('responds with a single JSON object,', () => {
    return chai.request(app).get(getString)
      .then(res => {
        expect(res.status).to.equal(200)
        // Lookup how to make sure something is json
        expect(res.body).to.be.an('object')
      })
  })

  it('should return correct row (Luke Cage),', () => {
    return chai.request(app).get(getString)
      .then(res => {
        expect(res.body.hero.name).to.equal('Luke Cage')
      })
  })

})
