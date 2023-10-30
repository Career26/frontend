import { useGetProfileQuery } from '@apis/profileApi';
import { mockUserProfile } from '@mocks/profileMocks';
import { Wrapper } from '@shared/utils/testUtil';
import { renderHook, waitFor } from '@testing-library/react';

describe('profileApi', () => {
  jest.setTimeout(10000);
  it('Should return profile', async () => {
    const { result } = renderHook(() => useGetProfileQuery(), { wrapper: Wrapper });
    await waitFor(() => {
      console.log(result.current);
      expect(result.current.data).toEqual(mockUserProfile);
    });
  });
});
