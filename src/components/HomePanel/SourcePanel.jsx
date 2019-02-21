import React from 'react'
import './style.css'
import SourceCard from './SourceCard'

const cards = [...Array(3).keys()]

const SourcePanel = props => {
  if (props.source === undefined) {
    return null
  }

  if (!props.source.sources) {
    return null
  }

  const sources = props.source.sources

  console.log("Final source", sources)

  return (
    <div className="source-container">
      {sources.map(sourceEntry => (
        <SourceCard source={sourceEntry} />
      ))}
    </div>
  )
}

export default SourcePanel
