// Impure Imports
const quipu = require('./quipu')
const { log, trace } = require('@mugos/log')
// Pure Imports
const Future = require('fluture')
const { compose, apply, lensProp, over, map, pickAll } = require('ramda')

// Public
const parse = (_) => x => x
const call = (_) => ({ body, phone }) => Future((reject, resolve) => {
  quipu.sendSMS(body, phone)
  resolve('ok')
})
const create = function ({ modem: { name, sms } }) {
  quipu.handle("initialize", { modem: name, sms })
}

module.exports = {
  modemClient: { create, parse, call }
}
