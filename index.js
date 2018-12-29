// Import Impure
const fs = require('fs')
const { trace, log } = require('@mugos/log')
// Import Local Impure
const { main } = require('./src')
// Def Functions Impure
const envs = (name) => process.env[name]
// Def Constants
const FILE = JSON.parse(fs.readFileSync(envs('CSV_FILE_PATH'), 'utf8'))
// Def Modules Config
const config = {
  module: envs('MODULE'),
  accountId: envs('TWILIO_ACCOUNT_ID'),
  token: envs('TWILIO_AUTH_TOKEN'),
  from: envs('TWILIO_PHONE')
}

main(config)(FILE)
