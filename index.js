// Impure Imports
const fs = require('fs')
const { createClient } = require('./src/twilio')
const { trace, log } = require('@mugos/log')
// Pure Imports
const { parallel } = require('fluture')
const { compose, sortBy, prop, map, over, lensProp } = require('ramda')
const { mapRej, promiseToFuture } = require('@mugos/ftw')
const { shuffle, raffle, createMessage } = require('./src/pure')

// Impure
const envs = (name) => process.env[name]
const accountId = envs('TWILIO_ACCOUNT_ID')
const token = envs('TWILIO_AUTH_TOKEN')
const filePath = envs('CSV_FILE_PATH')
const senderPhone = envs('TWILIO_PHONE')
const file = JSON.parse(fs.readFileSync(filePath, 'utf8'))
const client =  createClient(token)(accountId)
// Pure
const parser = ({ body, from, phone }) => ({
  body, from, to: phone
})
const MESSAGE = 'o minimo é de R$20 e o maximo R$50'
const fork = (x) => x.fork(console.error, console.log)

compose(
  fork,
  mapRej(x => console.error(x)),
  map(map(prop('to'))),
  x => parallel(10, x),
  map(client),
  map(parser),
  map(x => over(lensProp('body'), (_) => createMessage(MESSAGE)(x), x)),
  map(over(lensProp('from'), x => senderPhone)),
  sortBy(prop('id')),
  raffle,
  shuffle(x => Math.random())
)(file)
