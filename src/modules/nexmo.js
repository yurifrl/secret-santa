// Impure Imports
const { log, trace } = require('@mugos/log')
const axios = require('axios')
// Pure Imports
const query = require('querystring')
const { encaseP2, resolve } = require('fluture')
const removeAccents = require('remove-accents')
const { compose, lensProp, over, map, pickAll } = require('ramda')
// Functions Impure
const post = encaseP2(axios.post)

// Private
const URL = 'https://rest.nexmo.com/sms/json'

const sendSms = (data) =>
  post(URL, data)

// Public
const parse = ({ nexmo: { from, apiKey, apiSecret } }) => compose(
  ({ body, phone }) => ({ from, text: body, to: phone, api_key: apiKey, api_secret: apiSecret, type: 'text' }),
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
