export const PRESET_LAYOUT = {
  name: 'preset',
  padding: 6,
  animate: false
}

export const CONCENTRIC_LAYOUT = {
  name: 'concentric',
  padding: 6,
  minNodeSpacing: 100,
  animate: false
}

export const COSE_LAYOUT = {
  name: 'cose',
  padding: 6,
  nodeRepulsion: function(node) {
    return 10080000
  },
  nodeOverlap: 400000,
  idealEdgeLength: function(edge) {
    return 10
  },
  animate: false,
  fit: false
}
