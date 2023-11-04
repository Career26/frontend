import React from 'react';
import * as sessionSlice from '@slices/sessionSlice';
import { renderWithProviders } from '@shared/utils/testUtil';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { featureTiles } from '@shared/config/featureConstants';

import { PageHeader } from '../PageHeader';

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
}));

jest.mock('@slices/sessionSlice', () => ({
  __esModule: true,
  ...jest.requireActual('@slices/sessionSlice'),
}));

const mockPathName = 'feature-url';
const mockClickCareersTest = jest.fn();
const mockGoToHomepage = jest.fn();
const mockGoToSettings = jest.fn();
jest.mock('@shared/hooks/usePageNavigation', () => ({
  usePageNavigation: () => ({
    clickCareersTest: mockClickCareersTest,
    goToHomepage: mockGoToHomepage,
    goToSettings: mockGoToSettings,
    currentPathname: mockPathName,
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

  describe('Authenticated', () => {
    test('Clicking logout should call logOut', async () => {
      renderHeader(true);
      await userEvent.click(screen.getByTestId('user-menu'));
      await userEvent.click(screen.getByText('Logout'));
      expect(mockSignOut).toHaveBeenCalled();
    });
    it('Clicking account settings should take the user to settings page', async () => {
      renderHeader(true);
      await userEvent.click(screen.getByTestId('user-menu'));
      await userEvent.click(screen.getByText('Account Settings'));
      expect(mockGoToSettings).toHaveBeenCalled();
    });
    describe('NavigationCenter', () => {
      const [insights, questions, mentor] = featureTiles;
      test.each([insights, questions])('Can navigate to feature', async (feature) => {
        renderHeader(true);
        await userEvent.click(screen.getByLabelText('navigation-center'));
        await userEvent.click(screen.getByText(feature.title));
        expect(mockPush).toHaveBeenCalledWith(feature.link);
      });
      test('Mentor page is disabled', async () => {
        renderHeader(true);
        await userEvent.click(screen.getByLabelText('navigation-center'));
        await userEvent.click(screen.getByText(mentor.title));
        expect(mockPush).not.toHaveBeenCalled();
      });
    });
  });
});
