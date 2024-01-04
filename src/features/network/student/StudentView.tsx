import { selectCareerPaths } from '@apis/profileApi';
import { useAppSelector } from '@state/store';

import { NetworkContainer } from '@network/components/NetworkContainer';

export const StudentView = () => {
  const careerPaths = useAppSelector(selectCareerPaths);
  return (
    <NetworkContainer>
      {!careerPaths && <div>You do not have any career paths saved. Take our test now...</div>}
    </NetworkContainer>
  );
};
