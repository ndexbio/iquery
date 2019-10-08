export type FilteredGenes = {
  uniqueGeneMap: Map<string, Record<string, any>>
  notFound: string[]
}

const filterGenes = (resultList: any[]): FilteredGenes => {
  const uniqueGeneMap = new Map<string, Record<string, any>>()
  const notFound = new Array<string>()

  let len: number = resultList.length

  while (len--) {
    const entry: Record<string, any> = resultList[len]
    const query: string = entry.query

    if (entry.notfound) {
      notFound.push(query)
    } else {
      uniqueGeneMap.set(query, entry)
    }
  }

  return {
    uniqueGeneMap,
    notFound
  } as FilteredGenes
}

export { filterGenes }
