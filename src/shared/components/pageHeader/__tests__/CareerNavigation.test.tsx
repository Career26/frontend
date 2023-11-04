import React from 'react';
import * as pageNav from '@shared/hooks/usePageNavigation';
import { screen } from '@testing-library/react';
import { mockUserProfile } from '@mocks/profileMocks';
import { renderWithProviders } from '@shared/utils/testUtil';
import userEvent from '@testing-library/user-event';

import { CareerNavigation } from '../CareerNavigation';

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
  it('Should not render navigation when showNavigation=false', () => {
    // @ts-ignore - only need to mock showNavigation, do not need to mock anything else
    jest.spyOn(pageNav, 'usePageNavigation').mockReturnValue({ showNavigation: false });
    renderWithProviders(<CareerNavigation />);
    expect(screen.queryByText(initialCareerPath.title)).not.toBeInTheDocument();
  });
  it('Should render initial career path as selected career when showNavigation=true', () => {
    renderWithProviders(<CareerNavigation />);
    expect(screen.getByText(initialCareerPath.title)).toBeInTheDocument();
  });
  test('Selected career path is switched when clicking from the menu', async () => {
    renderWithProviders(<CareerNavigation />);
    await userEvent.click(screen.getByText(initialCareerPath.title));
    await userEvent.click(screen.getByText(nextCareerPath.title));
    expect(mockToggleCareerId).toHaveBeenCalledWith(nextCareerId);
  });
  test('Career path is favourited when clicking the heart symbol', async () => {
    renderWithProviders(<CareerNavigation />);
    await userEvent.click(screen.getByText(initialCareerPath.title));
    await userEvent.click(screen.getByLabelText(`favourite-icon-${initialCareerId}`));
    expect(mockToggleSelectedCareer).toHaveBeenCalledWith({
      selected: !initialCareerPath.selected,
      careerIdentifier: initialCareerId,
      profileIdentifier: mockUserProfile.identifier,
    });
  });
});
