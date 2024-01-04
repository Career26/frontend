import { useAppSelector } from '@state/store';
import { selectMentorProfile } from '@apis/profileApi';

import { MentorRequestForm } from './MentorRequestForm';

import { NetworkContainer } from '@network/components/NetworkContainer';

import { MentorStatus } from '@datatypes/profile';

export const MentorView = () => {
  const mentorProfile = useAppSelector(selectMentorProfile);
  return (
    <NetworkContainer>
      {mentorProfile?.status === MentorStatus.APPROVED && <MentorRequestForm />}
    </NetworkContainer>
  );
};
