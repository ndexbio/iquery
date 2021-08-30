import React from 'react'
import renderer from 'react-test-renderer'

import TitleBar from '../TitleBar'

test('Test title bar component', () => {
  const props = {
    uiState: {
      isSettingsOpen: false
    },
    search: {
      results: null

    }
  }
  const result = renderer.create(<TitleBar {...props} />).toJSON();
  expect(result).toBeDefined();
  expect(result.type).toBe('header');
  
})
