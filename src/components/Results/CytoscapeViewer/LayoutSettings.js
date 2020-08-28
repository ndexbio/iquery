export const PRESET_LAYOUT = {
  name: 'preset',
  padding: 6,
  animate: false,
  positions: function(node) {
    const x = node[0]._private.position.x * 0;
    const y = node[0]._private.position.y * 0;
    return {
      x: x, //node[0]._private.position.x,
      y: y, //node[0]._private.position.y
    };
  },
};

export const CONCENTRIC_LAYOUT = {
  name: 'concentric',
  padding: 6,
  minNodeSpacing: 100,
  animate: false,
};

export const COSE_LAYOUT = {
  name: 'cose',
  padding: 6,
  nodeRepulsion: function(node) {
    return 10080000;
  },
  nodeOverlap: 400000,
  idealEdgeLength: function(edge) {
    return 10;
  },
  animate: false,
  fit: false,
};
