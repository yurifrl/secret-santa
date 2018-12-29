// Import Impure
const { trace, log } = require('@mugos/log')
// Import Pure
const { parallel, reject } = require('fluture')
const { compose, sortBy, prop, pickAll, map, cond, propEq, T } = require('ramda')
const { mapRej, promiseToFuture } = require('@mugos/ftw')
// Import Local Impure
const { twillioClient } = require('./modules/twilio')
const { fakeClient } = require('./modules/fake')
const { nexmoClient } = require('./modules/nexmo')
// Import Local Pure
const { shuffle, raffle, createMessage } = require('./pure')
const { engine } = require('./engine')
// Def Constants
const MESSAGE = 'o minimo é de R$20 e o maximo R$50'
// Def Functions Pure
const fork = (x) => x.fork(console.error, console.log)
const pickModule = cond([
  [ propEq('module', 'twilio'), config => engine(config)(twillioClient) ],
  [ propEq('module', 'fake'),   config => engine(config)(fakeClient) ],
  [ propEq('module', 'nexmo'),  config => engine(config)(nexmoClient) ],
  [ T,                          (_) => (_) => reject('Invalid Module') ]
])

const main = (config) => compose(
  fork,
  mapRej(x => console.error(x)),
  t => parallel(10, t),
  map(pickModule(config)),
  map(createMessage(MESSAGE)),
  sortBy(prop('id')),
  raffle,
  shuffle(x => Math.random())
)

module.exports = { main }
