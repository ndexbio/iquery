const nodesSelected = (selected, actions) => {
  try {
    console.log('TAP---------->', selected, actions)
    actions.selectNode(selected)
  } catch (e) {
    console.warn('Failed to handle selection', selected)
  }
}

export { nodesSelected }
