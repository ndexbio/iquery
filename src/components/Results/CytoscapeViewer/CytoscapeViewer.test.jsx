import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

// import renderer from 'react-test-renderer'

import CytoscapeViewer from '.'
import ErrorBoundary from '../../ErrorBoundary';
test('Show error boundary if Cytoscape Viewer throws errors', async () => {
    render(
      <ErrorBoundary message="test errors">
         <CytoscapeViewer />
      </ErrorBoundary>)
  const errorBoundary = screen.getByText(/test errors/i);
  expect(errorBoundary).toBeInTheDocument();
})
