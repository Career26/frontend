import { useAppSelector } from '@state/store';
import { selectNetworkView } from '@slices/sessionSlice';

import { StudentView } from './student/StudentView';
import { MentorView } from './mentor/MentorView';

import { NetworkView } from '@datatypes/network';

const Index = () => {
  const view = useAppSelector(selectNetworkView);
  return view === NetworkView.MENTOR ? <MentorView /> : <StudentView />;
};

export default Index;
