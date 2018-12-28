// Impure Imports
const fs = require('fs')
const twilio = require('twilio')
const { trace, log } = require('@mugos/log')
// Pure Imports
const { encaseP, parallel } = require('fluture')
const Future = require('fluture')
const { compose, sortBy, prop, map, over, lensProp } = require('ramda')
const { mapRej, promiseToFuture } = require('@mugos/ftw')
const { shuffle, raffle, createMessage } = require('./pure')

// Impure
const envs = (name) => process.env[name]
const accountId = envs('TWILIO_ACCOUNT_ID')
const token = envs('TWILIO_AUTH_TOKEN')
const filePath = envs('CSV_FILE_PATH')
const senderPhone = envs('TWILIO_PHONE')
const file = JSON.parse(fs.readFileSync(filePath, 'utf8'))
// Pure
const parser = ({ body, from, phone }) => ({
  body, from, to: phone
})
const call = (client) => (p) => Future((reject, resolve) => { client.messages.create(p).then(resolve).catch(resolve).done() })
const MESSAGE = 'o valor limite é de R$10,00'
const client = twilio(accountId, token)
const fork = (x) => x.fork(console.error, console.log)

compose(
  fork,
  mapRej(x => console.error(x)),
  x => parallel(10, x),
  map(call(client)),
  map(parser),
  map(x => over(lensProp('body'), (_) => createMessage(MESSAGE)(x), x)),
  map(over(lensProp('from'), x => senderPhone)),
  sortBy(prop('id')),
  raffle,
  shuffle(x => Math.random())
)(file)
