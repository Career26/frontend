import { useAppSelector } from '@state/store';
import { selectMentorProfile } from '@apis/profileApi';

import { MentorRequestForm } from './MentorRequestForm';

import { NetworkContainer } from '@network/components/NetworkContainer';
import { NetworkGrid } from '@network/components/NetworkGrid';

import { MentorStatus } from '@datatypes/profile';

export const MentorView = () => {
  const mentorProfile = useAppSelector(selectMentorProfile);

  if (mentorProfile?.status !== MentorStatus.APPROVED) {
    return <MentorRequestForm />;
  }
  return (
    <NetworkContainer>
      <NetworkGrid />
    </NetworkContainer>
  );
};
