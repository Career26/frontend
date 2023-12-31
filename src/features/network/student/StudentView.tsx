import { selectCareerPaths } from '@apis/profileApi';
import { useAppSelector } from '@state/store';

import { NetworkContainer } from '@network/components/NetworkContainer';
import { NetworkGrid } from '@network/components/NetworkGrid';

export const StudentView = () => {
  const careerPaths = useAppSelector(selectCareerPaths);
  if (!careerPaths) {
    return <div>You do not have any career paths saved. Take our test now...</div>;
  }
  return (
    <NetworkContainer>
      <NetworkGrid />
    </NetworkContainer>
  );
};
