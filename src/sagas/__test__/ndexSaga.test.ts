import rootSaga, { fetchSource } from '../ndexSaga'

import fromGenerator from 'redux-saga-test'
import { expectSaga, testSaga } from 'redux-saga-test-plan'

it('create root saga', () => {
  const generator = rootSaga()
  console.log(generator.next())
  // expect(generator.next().value).toMatchObject(all([{}]))
})

it('Check source', () => {
  const generator = fetchSource({})


  console.log(generator.next())
})
