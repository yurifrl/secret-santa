// Impure Imports
const twilio = require('twilio')
const { log, trace } = require('@mugos/log')
// Pure Imports
const Future = require('fluture')
const { compose, apply, lensProp, over, map, pickAll } = require('ramda')

// Private
const messageCreate = (client) => (payload) => Future((reject, resolve) => {
  client.messages.create(payload).then(resolve).catch(reject).done()
})
// Public
const parse = ({ twilio: { from } }) => compose(
  ({ body, from, phone }) => ({ body, from, to: phone }),
  over(lensProp('from'), x => from),
)
const call = ({ client }) => compose(
  map(pickAll(['to', 'priceUnit', 'price'])),
  messageCreate(client),
)
const create = ({ twilio: { accountId, token } }) => twilio(accountId, token)

module.exports = {
  twillioClient: { create, parse, call }
}
