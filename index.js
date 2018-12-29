// Import Impure
const fs = require('fs')
const { trace, log } = require('@mugos/log')
// Import Local Impure
const { main } = require('./src')
// Def Functions Impure
const envs = (name) => process.env[name]
// Def Constants
const FILE = JSON.parse(fs.readFileSync(envs('JSON_FILE_PATH'), 'utf8'))
// Def Modules Config

log('seed --->')(envs('SEED'))
const config = {
  module: envs('MODULE'),
  twilio: {
    accountId: envs('TWILIO_ACCOUNT_ID'),
    token: envs('TWILIO_AUTH_TOKEN'),
    from: envs('TWILIO_PHONE')
  },
  nexmo: {
    apiKey: envs('NEXMO_API_KEY'),
    apiSecret: envs('NEXMO_API_SECRET'),
    from: 'Nexmo'
  },
  modem: {
       name: "/dev/ttyUSB0",
    sms: "/dev/ttyUSB2"
  }
}

main(envs('SEED'))(config)(FILE)
