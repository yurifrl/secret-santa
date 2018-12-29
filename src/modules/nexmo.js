// Impure Imports
const Nexmo = require('nexmo')
const { log, trace } = require('@mugos/log')
// Pure Imports
const { resolve } = require('fluture')
const { compose, lensProp, over, map, pickAll } = require('ramda')

// Private
const sendSms = (client) => ({ from, to, body }) => Future((reject, resolve) => {
    client.message.sendSms(from, to, body, {}, (v) => resolve(v))
})
// Public
const parse = ({ from }) => compose(
  ({ body, from, phone }) => ({ body, from, to: phone }),
  over(lensProp('from'), x => from),
)
const call = ({ client}) => sendSms(client)
const create = ({ apiKey, apiSecret }) => new Nexmo({ apiKey, apiSecret })

module.exports = {
  nexmoClient: { create, parse, call }
}
