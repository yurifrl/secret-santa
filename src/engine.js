// Impure Imports
const { log, trace } = require('@mugos/log')
// Pure Imports
const { compose } = require('ramda')

const engine = (config) => ({ create, parse, call }) => (ctx) => compose(
  ({ client, payload }) => call({ client, ...config })(payload),
  (payload) => ({ payload, client: create(config)}),
  parse(config)
)(ctx)

module.exports = {
  engine
}
