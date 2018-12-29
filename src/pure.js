const {
  compose, map, sort, prop, head, tail, ifElse, length, concat, reduce, reduced,
  transduce, flip, append, take, reduceRight, mapAccum, mapAccumRight, zip, range,
  merge, over, lensProp, join, isEmpty, not, cond, lenght, gte, equals
} = require('ramda')
const { trace, log } = require('@mugos/log')
const { Random } =  require('./random')

const createShuffle = (random) => compose(
  map(prop('value')),
  sort((a, b) => a.sort - b.sort),
  map((a) => ({ sort: random.next(), value: a })),
)
const shuffle = (seed) => createShuffle(Random.of(seed))
const builder = ({ giver, receiver }) => ({
  id: giver.id, giver: giver.name, receiver: receiver.name,
  phone: giver.phone, want: receiver.want, deliver: giver.deliver
})
const raffle = compose(
  map(builder),
  ({ giver, receiver, size }) => map((i) => ({ giver: giver[i], receiver: receiver[i] }), size),
  ({ giver, receiver }) => ({ giver, receiver, size: range(0, length(giver)) }),
  x => ({ receiver: x, giver: append(head(x), tail(x)) }),
)
const defaultMessage = (finalMessage) => ({ giver, receiver, want }) => `Olá ${giver}, o seu amigo secreto é "${receiver}", aqui está a lista de desejos de ${receiver}: "${want}" ${finalMessage}`
const noWantMessage = (finalMessage) => ({ giver, receiver }) => `Olá ${giver}, o seu amigo secreto é "${receiver}", ${finalMessage}`
const buildBody = (finalMessage) => cond([
  [ compose(not, isEmpty, prop('want')), defaultMessage(finalMessage) ],
  [ compose(isEmpty, prop('want')), noWantMessage(finalMessage) ],
])
const createMessage = (message) => x => over(lensProp('body'), (_) => buildBody(message)(x), x)

module.exports = { shuffle, raffle, createMessage }
