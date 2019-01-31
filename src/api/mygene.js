const MYGENE_BASE_URL = 'http://mygene.info/v3/query'

const METHOD_POST = 'POST'

/**
 * Client for MyGene.info
 *
 * @param geneList
 * @returns {Promise<Response>}
 */
const searchGenes = geneList => {
  const headers = {
  }

  // const geneQuery = geneList.join()

  const fields = 'fields=symbol,name,taxid,entrezgene,summary'
  const searchUrl = MYGENE_BASE_URL + '?q=' + geneList + '&scopes=symbol&' + fields

  console.log('Calling MyGene API:', searchUrl)

  return fetch(searchUrl, {
    method: METHOD_POST
  })
}

export { searchGenes }
