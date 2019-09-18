// List attributes starts with this prefix.
const LIST_PREFIX = "list_of_"

export const getListNodeAttr = (originalCX, nodeId) => {
  const nodeAttr = findAttributes(originalCX, "nodeAttributes")
  const listAttr = nodeAttr.filter(
    attr => attr.d.startsWith(LIST_PREFIX) && attr.po.toString() === nodeId
  )

  return getAttrMap(listAttr)
}

export const getListNetworkAttr = originalCX => {
  const networkAttr = findAttributes(originalCX, "networkAttributes")
  const listAttr = networkAttr.filter(attr => attr.d.startsWith(LIST_PREFIX))

  return getAttrMap(listAttr)
}

const getAttrMap = attrs => {
  const listAttrMap = {}
  attrs.forEach(attr => {
    listAttrMap[attr.n] = attr.v
  })

  return listAttrMap
}

export const findAttributes = (originalCX, attrType) => {
  let len = originalCX.length
  let attr = null

  while (len--) {
    const entry = originalCX[len]
    if (entry[attrType]) {
      attr = entry[attrType]
      break
    }
  }

  return attr
}
