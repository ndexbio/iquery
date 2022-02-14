import rootSaga, { fetchSource, watchSearch } from '../ndexSaga'

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


it('search fails when mygene.info returns a service error', () => {
  const generator = watchSearch({payload: {
    geneList: ['tp53'],
    validateGenesWithMyGene: true,
    serviceTimeout: 0,
    sourceNames: ['test']
  }});

  const race = generator.next();
  const result = generator.next();
  const searchOutcome = generator.next();

  expect(searchOutcome.value.payload.action.type).toBe('SEARCH_FAILED');
})