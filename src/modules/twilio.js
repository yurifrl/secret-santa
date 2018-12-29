// Impure Imports
const twilio = require('twilio')
const { log, trace } = require('@mugos/log')
const { chainRej } = require('@mugos/ftw')
// Pure Imports
const Future = require('fluture')
const { resolve } = require('fluture')
const { compose, apply, lensProp, over, map, pickAll, tap, propEq, ifElse } = require('ramda')

// Private
const messageCreate = (client) => (payload) => Future((reject, resolve) => {
  client.messages.create(payload).then(resolve).catch(reject).done()
})
const messageCreateCluster = (client) => compose(
  map(pickAll(['to', 'priceUnit', 'price'])),
  messageCreate(client)
)
// Public
const parse = ({ twilio: { from } }) => compose(
  ({ body, from, phone, giver, deliver }) => ({ body, from, to: phone, giver, deliver }),
  over(lensProp('from'), x => from),
)
const handleError = (payload) => (e) => resolve({ failed: `Failed to deliver to ${payload.giver}` })
const call = ({ client }) => (payload) => compose(
  chainRej(handleError(payload)),
  ifElse(propEq('deliver', true), messageCreateCluster(client), ({ giver }) => resolve({ success: `Message already delivered to giver` })),
)(payload)
const create = ({ twilio: { accountId, token } }) => twilio(accountId, token)

module.exports = {
  twillioClient: { create, parse, call }
}
