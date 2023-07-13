import React from 'react';
import { render, screen } from '@testing-library/react';

import { LoadingPage } from '../LoadingPage';

describe('LandingPage', () => {
  it('Should render Loading...', () => {
    render(<LoadingPage />);
    expect(screen.getByText('Loading...')).toBeVisible();
  });
});
