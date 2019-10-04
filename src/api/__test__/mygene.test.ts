import { searchGenes } from '../mygene'

enum TP53 {
  NCBI = '7157',
  Taxid = 9606
}

it('check basic return value for a gene list', async () => {
  expect.assertions(5)

  const data = await searchGenes('tp53 brca1')
  const json = await data.json()
  expect(Array.isArray(json)).toBeTruthy()
  expect(json.length > 0).toBeTruthy()

  const ncbiGene: Set<string> = new Set(
    json.map((entry: Record<string, any>) => entry.entrezgene)
  )

  expect(ncbiGene.has(TP53.NCBI)).toBeTruthy()

  const filtered = json.filter(
    (entry: Record<string, any>) => entry.entrezgene === TP53.NCBI
  )

  expect(filtered.length).toEqual(1)
  const tp53 = filtered[0]

  expect(tp53.taxid).toEqual(TP53.Taxid)
})
