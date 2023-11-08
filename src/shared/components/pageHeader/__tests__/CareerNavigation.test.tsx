import React from 'react';
import * as pageNav from '@shared/hooks/usePageNavigation';
import { screen, waitFor } from '@testing-library/react';
import { mockUserProfile } from '@mocks/profileMocks';
import { renderWithProviders } from '@shared/utils/testUtil';
import userEvent from '@testing-library/user-event';
import * as sessionSlice from '@slices/sessionSlice';

import { CareerNavigation } from '../CareerNavigation';

jest.mock('@slices/sessionSlice', () => ({
  __esModule: true,
  ...jest.requireActual('@slices/sessionSlice'),
}));

jest.mock('@shared/hooks/useCareerTestStorage', () => ({
  useCareerTestStorage: () => ({
    careerTestStorage: { careerPaths: mockUserProfile.careerPaths },
  }),
}));

jest.mock('@slices/sessionSlice', () => ({
  __esModule: true,
  ...jest.requireActual('@slices/sessionSlice'),
}));

const mockToggleSelectedCareer = jest.fn();
jest.mock('@shared/hooks/useCareerSelection', () => ({
  useCareerSelection: () => ({
    loadingCareers: {},
    selectedCareers: {},
    toggleSelectedCareer: mockToggleSelectedCareer,
  }),
}));

const mockToggleCareerId = jest.fn();
jest.mock('@shared/hooks/usePageNavigation', () => ({
  __esModule: true,
  usePageNavigation: () => ({ toggleCareerId: mockToggleCareerId, showNavigation: true }),
}));

const [[initialCareerId, initialCareerPath], [nextCareerId, nextCareerPath]] = Object.entries(
  mockUserProfile.careerPaths,
);

describe('CareerNavigation', () => {
  beforeEach(() => {
    jest.spyOn(sessionSlice, 'selectSelectedCareerPath').mockReturnValue(initialCareerPath);
    jest.spyOn(sessionSlice, 'selectSelectedCareerPathId').mockReturnValue(initialCareerId);
  });
  it('Should not render navigation when showNavigation=false', () => {
    // @ts-ignore - only need to mock showNavigation, do not need to mock anything else
    jest.spyOn(pageNav, 'usePageNavigation').mockReturnValue({ showNavigation: false });
    renderWithProviders(<CareerNavigation />);
    expect(screen.queryByText(initialCareerPath.title)).not.toBeInTheDocument();
  });
  it('Should render initial career path as selected career when showNavigation=true', async () => {
    renderWithProviders(<CareerNavigation />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: initialCareerPath.title })).toBeInTheDocument();
    });
  });
  test('Selected career path is switched when clicking from the menu', async () => {
    renderWithProviders(<CareerNavigation />);
    await userEvent.click(screen.getByRole('button', { name: initialCareerPath.title }));
    await userEvent.click(screen.getByText(nextCareerPath.title));
    await waitFor(() => {
      expect(mockToggleCareerId).toHaveBeenCalledWith(nextCareerId);
    });
  });
  test('Career path is favourited when clicking the heart symbol', async () => {
    renderWithProviders(<CareerNavigation />);
    await userEvent.click(screen.getByRole('button', { name: initialCareerPath.title }));
    await userEvent.click(screen.getByLabelText(`favourite-icon-${initialCareerId}`));
    await waitFor(() => {
      expect(mockToggleSelectedCareer).toHaveBeenCalledWith({
        selected: !initialCareerPath.selected,
        careerIdentifier: initialCareerId,
        profileIdentifier: mockUserProfile.identifier,
      });
    });
  });
});
