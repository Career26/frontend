import { useGetCareerOverviewQuery } from '@apis/overviewApi';
import { mockOverview } from '@mocks/overviewMocks';
import { mockUserProfile } from '@mocks/profileMocks';
import { Wrapper } from '@shared/utils/testUtil';
import { renderHook, waitFor } from '@testing-library/react';

describe('overviewApi', () => {
  it('Should return overview for given careerId and profileId', async () => {
    const { careerIdentifier: careerId } = mockOverview;
    const { identifier: profileId } = mockUserProfile;
    const { result } = renderHook(() => useGetCareerOverviewQuery({ careerId, profileId }), {
      wrapper: Wrapper,
    });
    await waitFor(() => expect(result.current.data).toEqual(mockOverview));
  });
});
