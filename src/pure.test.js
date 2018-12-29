const test = require('ava')
const { raffle, createMessage } = require('./pure')

test('Shuffle a list of people', t => {
  const list = [
    { id: 1, name: 'Marie', phone: '555-555-555', want: ['nobel'], deliver: true },
    { id: 2, name: 'Yuri', phone: '555-555-552', want: ['batata', 'water'], deliver: true },
    { id: 3, name: 'Malala', phone: '555-555-553', want: ['human rights'], deliver: true },
    { id: 4, name: 'Gabriel', phone: '556-555-551', want: ['coca'], deliver: true }
  ]

  const result = raffle(list)

  t.deepEqual(result, [
    { id: 2, receiver: 'Marie', giver: 'Yuri', phone: '555-555-552', want: ['nobel'], deliver: true },
    { id: 3, receiver: 'Yuri', giver: 'Malala', phone: '555-555-553', want: ['batata', 'water'], deliver: true },
    { id: 4, receiver: 'Malala', giver: 'Gabriel', phone: '556-555-551', want: ['human rights'], deliver: true },
    { id: 1, receiver: 'Gabriel', giver: 'Marie', phone: '555-555-555', want: ['coca'], deliver: true }
  ])
})

test('Create a nice message', t => {
  const item = { receiver: 'Marie', giver: 'Yuri', phone: '222-222-222', want: ['pato', 'water'], deliver: true }

  const result = createMessage('o valor limite é de R$10,00')(item)

  const expected = 'Olá Yuri, o seu amigo secreto é "Marie", aqui está a lista de desejos de Marie: "pato,water" o valor limite é de R$10,00'

  t.is(result.body, expected)
})


test('Create a nice message when want empty', t => {
  const item = { receiver: 'Marie', giver: 'Yuri', phone: '222-222-222', want: [], deliver: true }

  const result = createMessage('o valor limite é de R$10,00')(item)

  const expected = 'Olá Yuri, o seu amigo secreto é "Marie", o valor limite é de R$10,00'

  t.is(result.body, expected)
})
