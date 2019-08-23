import React, {Component, useState, useEffect} from 'react';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ReorderListItem from './ReorderListItem';

import List from '@material-ui/core/List'

const noPadding = {
  padding: '0',
  width: '100%'
}

const ReorderList = props => {
  const {uiState, uiStateActions} = props
  const items = uiState.sortOrder

  const moveListItem = (dragIndex, hoverIndex) => {
    console.log("dragIndex: " + dragIndex)
    console.log("hoverIndex: " + hoverIndex)
    let newItems = items
    newItems.splice(hoverIndex, 0, newItems.splice(dragIndex, 1)[0])
    uiStateActions.setSortOrder(newItems)
    console.log("newItems: " + newItems)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <List style={noPadding} disableGutters={true}>
        {items.map((item, i) => (
          <ReorderListItem
            key={item}
            index={i}
            id={item}
            text={item}
            moveListItem={moveListItem}
            uiStateActions={props.uiStateActions}
            uiState={props.uiState}
          />
        ))}
      </List>
    </DndProvider>
  )
}

export default (ReorderList)