// Impure Imports
const { log, trace } = require('@mugos/log')
const axios = require('axios')
// Pure Imports
const query = require('querystring')
const { encaseP3, resolve } = require('fluture')
const removeAccents = require('remove-accents')
const { compose, lensProp, over, map, pickAll } = require('ramda')
// Functions Impure
const post = encaseP3(axios.post)

// Private
const URL = 'https://rest.nexmo.com/sms/json'

const sendSms = (payload) =>
  resolve('ok')
  // post(URL, {}, payload)

// Public
const parse = ({ nexmo: { from, apiKey, apiSecret } }) => compose(
  trace,
  ({ form, body, phone }) => ({ from, text: body, to: phone, api_key: apiKey, api_secret: apiSecret }),
  // over(lensProp('body'), query.escape),
  // over(lensProp('body'), str => str.replace(/R\$/g, '')),
  // over(lensProp('body'), removeAccents),
  over(lensProp('from'), x => from),
)
const call = ({ client}) => compose(
  client.sendSms,
)
const create = (_) => ({
  sendSms: sendSms
})

module.exports = {
  nexmoClient: { create, parse, call }
}
