import React from 'react';
import * as sessionSlice from '@slices/sessionSlice';
import { renderWithProviders } from '@shared/utils/testUtil';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { PageHeader } from '../PageHeader';

jest.mock('@slices/sessionSlice', () => ({
  __esModule: true,
  ...jest.requireActual('@slices/sessionSlice'),
}));

const mockClickCareersTest = jest.fn();
const mockGoToHomepage = jest.fn();
const mockGoToSettings = jest.fn();
jest.mock('@shared/hooks/usePageNavigation', () => ({
  usePageNavigation: () => ({
    clickCareersTest: mockClickCareersTest,
    goToHomepage: mockGoToHomepage,
    goToSettings: mockGoToSettings,
  }),
}));

const mockSignOut = jest.fn();
const renderHeader = (authenticated: boolean) => {
  renderWithProviders(<PageHeader authenticated={authenticated} signOut={mockSignOut} />);
};

describe('PageHeader', () => {
  describe('Not authenticated', () => {
    test('Clicking login should open the login module', async () => {
      const loginModalSpy = jest.spyOn(sessionSlice, 'setLoginModal');
      renderHeader(false);
      await userEvent.click(screen.getByText('Login'));
      expect(loginModalSpy).toHaveBeenCalledWith({ open: true, initialState: 'signIn' });
    });
    test('Clicking take-test should take the user to the test page', async () => {
      renderHeader(false);
      await userEvent.click(screen.getByText('Take the Test'));
      expect(mockClickCareersTest).toHaveBeenCalled();
    });
  });
});
