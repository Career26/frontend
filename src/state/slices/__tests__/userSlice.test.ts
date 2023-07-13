import { testState } from '@shared/utils/testUtil';

import { selectFirstName, selectLastName, userInitialState } from '../userSlice';

describe('userSlice', () => {
  describe('Selectors', () => {
    it('Should return first name', () => {
      expect(selectFirstName(testState)).toEqual(userInitialState.firstName);
    });
    it('Should return last name', () => {
      expect(selectLastName(testState)).toEqual(userInitialState.lastName);
    });
  });
});
