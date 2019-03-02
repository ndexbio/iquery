import React from 'react'
import './style.css'
import SourceCard from './SourceCard'
import ErrorCard from './ErrorCard'

const SourcePanel = props => {
  if (props.source === undefined || !props.source.sources) {
    return null
  }

  const sources = props.source.sources

  if (props.source.error !== null) {
    return (
      <div className="source-container">
        <ErrorCard />
      </div>
    )
  }

  return (
    <div className="source-container">
      {sources.map(sourceEntry => (
        <SourceCard key={sourceEntry.uuid} source={sourceEntry} />
      ))}
    </div>
  )
}

export default SourcePanel
