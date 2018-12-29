const test = require('ava')
const { raffle, createMessage } = require('./pure')

test('Shuffle a list of people', t => {
  const list = [
    { id: 1, name: 'Marie', phone: '555-555-555', want: ['nobel'] },
    { id: 2, name: 'Yuri', phone: '555-555-552', want: ['batata', 'water'] },
    { id: 3, name: 'Malala', phone: '555-555-553', want: ['human rights'] },
    { id: 4, name: 'Gabriel', phone: '556-555-551', want: ['coca'] }
  ]

  const result = raffle(list)

  t.deepEqual(result, [
    { id: 1, giver: 'Marie', receiver: 'Yuri', phone: '555-555-552', want: ['batata', 'water'] },
    { id: 2, giver: 'Yuri', receiver: 'Malala', phone: '555-555-553', want: ['human rights'] },
    { id: 3, giver: 'Malala', receiver: 'Gabriel', phone: '556-555-551', want: ['coca'] },
    { id: 4, giver: 'Gabriel', receiver: 'Marie', phone: '555-555-555', want: ['nobel'] }
  ])
})

test('Create a nice message', t => {
  const item = { giver: 'Marie', receiver: 'Yuri', phone: '222-222-222', want: ['pato', 'water'] }

  const result = createMessage('o valor limite é de R$10,00')(item)

  const expected = 'Olá Marie, o seu amigo secreto é Yuri, aqui está a lista de desejos de Yuri: "pato,water" o valor limite é de R$10,00'

  t.is(result, expected)
})


test('Create a nice message when want empty', t => {
  const item = { giver: 'Marie', receiver: 'Yuri', phone: '222-222-222', want: [] }

  const result = createMessage('o valor limite é de R$10,00')(item)

  const expected = 'Olá Marie, o seu amigo secreto é Yuri, o valor limite é de R$10,00'

  t.is(result, expected)
})