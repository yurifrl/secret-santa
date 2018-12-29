// Impure Imports
const { log, trace } = require('@mugos/log')
// Pure Imports
const { resolve } = require('fluture')
const { compose, lensProp, over, map, pickAll } = require('ramda')

const parse = ({ from }) => compose(
  ({ body, from, phone }) => ({ body, from, to: phone }),
  over(lensProp('from'), x => from),
)
const call = ({ client, from }) => (payload) => compose(
  map(pickAll(['to', 'priceUnit', 'price'])),
)(client.sendSms(payload))
const create = ({ accountId, token }) => ({
  sendSms: ({ to }) => resolve({ to, priceUnit: 'XBL', price: '$100' })
})

module.exports = {
  fakeClient: { create, parse, call }
}
