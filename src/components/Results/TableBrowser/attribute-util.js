import { mapKeys } from 'lodash';
// List attributes starts with this prefix.
const LIST_PREFIX = 'list_of_'

export const getListNodeAttr = (originalCX, nodeId) => {
  const nodeAttr = findAttributes(originalCX, 'nodeAttributes')
  const listAttr = nodeAttr.filter(
    attr => attr.d.startsWith(LIST_PREFIX) && attr.po.toString() === nodeId
  )

  return getAttrMap(listAttr)
}

export const getListNetworkAttr = originalCX => {
  const networkAttr = findAttributes(originalCX, 'networkAttributes')
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

export const getNetworkAttributes = (originalCX) => {
   //Find @context
   let context;
   context = findAttributes(originalCX, '@context');
   if (context != null) {
     context = context[0];
   } else {
     const networkAttr = findAttributes(
       originalCX,
       'networkAttributes'
     );
     if (networkAttr != null) {
       for (let i = 0; i < networkAttr.length; i++) {
         if (networkAttr[i].n === '@context') {
           context = JSON.parse(networkAttr[i].v);
         }
       }
     }
   }

   return context;
}

export const getNetworkElementAttributes = (originalCX) => {

  let context = getNetworkAttributes(originalCX);

  //Uppercase all keys in context
  const contextUpper = mapKeys(context, function(v, k) {
    return k.toUpperCase();
  });

  //Find lists and attributes
  let nodeList;
  let nodeAttributes;
  let edgeAttributes;
  for (let i = 0; i < originalCX.length; i++) {
    if (originalCX[i].nodes != null) {
      nodeList = originalCX[i].nodes;
      if (nodeAttributes != null && edgeAttributes != null) {
        break;
      }
    }
    if (originalCX[i].nodeAttributes != null) {
      nodeAttributes = originalCX[i].nodeAttributes;
      if (nodeList != null && edgeAttributes != null) {
        break;
      }
    }
    if (originalCX[i].edgeAttributes != null) {
      edgeAttributes = originalCX[i].edgeAttributes;
      if (nodeList != null && nodeAttributes != null) {
        break;
      }
    }
  }

  // Find node related properties
  const represents = {};
  const nodeListProperties = {}; //Dictionary { property name : dictionary { gene name : list of properties }}
  if (nodeList != null) {
    //Find represents
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].r != null) {
        represents[nodeList[i].n] = nodeList[i].r;
      }
    }
    //Find node properties that are lists
    if (nodeAttributes != null) {
      for (let i = 0; i < nodeAttributes.length; i++) {
        if (nodeAttributes[i].d === 'list_of_string') {
          let propDict = {};
          if (nodeListProperties[nodeAttributes[i].n] != null) {
            propDict = nodeListProperties[nodeAttributes[i].n];
          }
          const geneName = nodeList.filter(
            (node) => node['@id'] === nodeAttributes[i].po
          )[0].n;
          if (geneName != null) {
            if (propDict[geneName] == null) {
              propDict[geneName] = nodeAttributes[i].v;
            } else {
              propDict[geneName] = propDict[geneName].concat(
                nodeAttributes[i].v
              );
            }
          }
          nodeListProperties[nodeAttributes[i].n] = propDict;
        }
      }
    }
  }

  //Find edge properties that are lists
  const edgeListProperties = {};
  if (edgeAttributes != null) {
    for (let i = 0; i < edgeAttributes.length; i++) {
      if (edgeAttributes[i].d === 'list_of_string') {
        let propDict = {};
        if (edgeListProperties[edgeAttributes[i].n] != null) {
          propDict = edgeListProperties[edgeAttributes[i].n];
        }
        const edgeId = edgeAttributes[i].po;
        if (propDict[edgeId] == null) {
          propDict[edgeId] = edgeAttributes[i].v;
        } else {
          propDict[edgeId] = propDict[edgeId].concat(edgeAttributes[i].v);
        }
        edgeListProperties[edgeAttributes[i].n] = propDict;
      }
    }
  }

  return {
    contextUpper,
    represents,
    nodeList,
    edgeListProperties,
    nodeListProperties
  }
};