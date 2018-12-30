// Impure Imports
const { log, trace } = require('@mugos/log')
const { resolve } = require('fluture')
// Pure Imports
const { compose, ifElse, propEq } = require('ramda')

const createEngine = (config) => ({ create, parse, call }) => compose(
  ({ client, payload }) => call({ client, ...config })(payload),
  (payload) => ({ payload, client: create(config)}),
  parse(config),
)

const engine = (config) => (module) => ifElse(
  propEq('deliver', true),
  createEngine(config)(module),
  ({ giver }) => resolve({ success: `Message already delivered to ${giver}` })
)
module.exports = {
  engine
}
