import { METHOD_POST } from "./apiConstants"

const MYGENE_BASE_URL = "http://mygene.info/v3/query"

/**
 * Client for MyGene.info
 *
 * @param geneList
 * @returns {Promise<Response>}
 */
const searchGenes = geneList => {
  const fields =
    "fields=symbol,name,taxid,entrezgene,summary,genomic_pos,go,pathway"
  const searchUrl =
    MYGENE_BASE_URL + "?q=" + geneList + "&scopes=symbol&" + fields

  return fetch(searchUrl, {
    method: METHOD_POST
  })
}

export { searchGenes }
