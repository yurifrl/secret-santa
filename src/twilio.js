// Impure Imports
const twilio = require('twilio')
const { log, trace } = require('@mugos/log')
// Pure Imports
const Future = require('fluture')
const { compose, apply } = require('ramda')
//
const call = (client) => (payload) => Future((reject, resolve) => { client.messages.create(payload).then(resolve).catch(resolve).done() })
const createClient = (token) => (id) => compose(
  call,
  apply(twilio),
)([id, token])

module.exports = {
  createClient
}
