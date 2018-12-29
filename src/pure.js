const {
  compose, map, sort, prop, head, tail, ifElse, length, concat, reduce, reduced,
  transduce, flip, append, take, reduceRight, mapAccum, mapAccumRight, zip, range,
  merge, over, lensProp, join
} = require('ramda')
const { trace, log } = require('@mugos/log')

const shuffle = (seed) => compose(
  map(prop('value')),
  sort((a, b) => a.sort - b.sort),
  map((a) => ({ sort: seed(), value: a })),
)
const builder = ({ a, b }) => ({
  id: a.id, giver: a.name, receiver: b.name,
  phone: b.phone, want: b.want,
})
const raffle = compose(
  map(builder),
  ({ a, b, size }) => map((i) => ({ a: a[i], b: b[i] }), size),
  ({ a, b }) => ({ a, b, size: range(0, length(a)) }),
  x => ({ a: x, b: append(head(x), tail(x)) }),
)
const wantLens = lensProp('want')
const createMessage = (finalMessage) =>
  ({ giver, receiver, want }) => `Olá ${giver}, o seu amigo secreto é ${receiver}, aqui está a lista de desejos de ${receiver}: "${want}" ${finalMessage}`


module.exports = { shuffle, raffle, createMessage }
