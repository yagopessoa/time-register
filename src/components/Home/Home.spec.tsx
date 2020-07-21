import React from 'react'
import { render } from '@testing-library/react'

import Home from './index'

test('Home should renders', () => {
  const { getByText, getByAltText } = render(<Home />)

  expect(
    getByText('An Electron boilerplate including TypeScript, React, Jest and ESLint.')
  ).toBeTruthy()
  expect(getByAltText('ReactJS logo')).toBeTruthy()
})
